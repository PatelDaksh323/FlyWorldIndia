import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ORIGIN, DESTINATIONS, type GeoPoint } from "./destinations";

/**
 * The signature 3D globe — hand-written plain Three.js in a useEffect
 * (per CLAUDE.md, no react-three-fiber). This module is the ONLY thing that
 * pulls in Three.js, and it is imported lazily by Home so the ~600KB never
 * ships in the main bundle.
 *
 * Conceptually (CLAUDE.md):
 *   1. A graticule of lat/long lines reads as "globe" with no Earth texture.
 *   2. A solid dark sphere just inside it hides far-side arcs correctly.
 *   3. Lat/long -> 3D points via trig (toVec).
 *   4. Each flight path = a quadratic Bezier from India to a destination,
 *      midpoint pushed outward so it bows into an arc.
 *   5. A bright "comet" walks along each curve, staggered.
 *   6. rAF loop spins it slowly and eases it toward the mouse.
 *   + a golden atmosphere halo (the only GLSL in the project).
 */

const RADIUS = 1.6;
const GOLD = new THREE.Color("#E8B04B");
const CORAL = new THREE.Color("#FF8A5B");

/** Lat/long (degrees) -> point on a sphere of the given radius. */
function toVec(lat: number, lon: number, radius = RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Quadratic Bézier from origin to destination, bowed outward into an arc. */
function makeArc(a: THREE.Vector3, b: THREE.Vector3): THREE.QuadraticBezierCurve3 {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const dist = a.distanceTo(b);
  // Higher lift for longer hops so the arc clears the surface.
  mid.normalize().multiplyScalar(RADIUS + dist * 0.55);
  return new THREE.QuadraticBezierCurve3(a, mid, b);
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable — parent already shows a CSS fallback.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";

    // Group holds everything so we spin one thing.
    const world = new THREE.Group();
    // Tilt so India sits pleasingly toward the viewer.
    world.rotation.x = 0.35;
    scene.add(world);

    // 1) Solid dark inner sphere — occludes far-side arcs.
    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#0A1128") })
    );
    world.add(inner);

    // 2) Graticule (lat/long lines) — reads as a globe, texture-free.
    const graticule = buildGraticule();
    world.add(graticule);

    // 3) Golden atmosphere halo — the project's only GLSL (a fresnel rim).
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.18, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: GOLD } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uColor;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_FragColor = vec4(uColor, 1.0) * intensity;
          }`,
      })
    );
    scene.add(atmosphere);

    // 4) City dots + flight arcs from India to each destination.
    const originVec = toVec(ORIGIN.lat, ORIGIN.lon);
    world.add(cityDot(originVec, GOLD, 0.05));

    type CometTrack = { curve: THREE.QuadraticBezierCurve3; mesh: THREE.Mesh; offset: number };
    const comets: CometTrack[] = [];

    DESTINATIONS.forEach((dest: GeoPoint, i: number) => {
      const destVec = toVec(dest.lat, dest.lon);
      world.add(cityDot(destVec, CORAL, 0.035));

      const curve = makeArc(originVec, destVec);
      const points = curve.getPoints(60);
      const arc = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.42 })
      );
      world.add(arc);

      // Comet dot walking the arc, staggered so they don't move in sync.
      const comet = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 12, 12),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("#FFF4E0") })
      );
      world.add(comet);
      comets.push({ curve, mesh: comet, offset: i / DESTINATIONS.length });
    });

    // 6) Interaction: ease rotation toward the pointer.
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    window.addEventListener("pointermove", onPointer);

    // Responsive sizing.
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const renderOnce = () => renderer.render(scene, camera);

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();

      // Slow idle spin + eased mouse follow.
      world.rotation.y += 0.0016;
      world.rotation.x += (0.35 + target.y - world.rotation.x) * 0.05;
      world.rotation.z += (target.x * 0.15 - world.rotation.z) * 0.05;

      // March the comets along their arcs.
      for (const c of comets) {
        const p = (t * 0.18 + c.offset) % 1;
        c.mesh.position.copy(c.curve.getPointAt(p));
        const scale = 0.6 + Math.sin(p * Math.PI) * 0.9;
        c.mesh.scale.setScalar(scale);
      }

      renderOnce();
      raf = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      // Static frame — still communicates the idea, no motion.
      for (const c of comets) c.mesh.position.copy(c.curve.getPointAt(0.5));
      renderOnce();
    } else {
      raf = requestAnimationFrame(tick);
    }

    // Pause when offscreen / tab hidden (battery + perf).
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion && !running) {
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else m.dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}

/** Small glowing dot at a city location. */
function cityDot(pos: THREE.Vector3, color: THREE.Color, size: number): THREE.Mesh {
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(size, 14, 14),
    new THREE.MeshBasicMaterial({ color })
  );
  dot.position.copy(pos);
  return dot;
}

/** Build latitude + longitude ring lines. */
function buildGraticule(): THREE.LineSegments {
  const positions: number[] = [];
  const step = 6; // degrees between samples along a ring

  // Latitude rings.
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = -180; lon < 180; lon += step) {
      const a = toVec(lat, lon, RADIUS);
      const b = toVec(lat, lon + step, RADIUS);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  // Longitude rings.
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -90; lat < 90; lat += step) {
      const a = toVec(lat, lon, RADIUS);
      const b = toVec(lat + step, lon, RADIUS);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.16 })
  );
}
