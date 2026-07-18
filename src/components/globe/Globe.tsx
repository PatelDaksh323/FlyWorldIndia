import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ORIGIN, DESTINATIONS, type GeoPoint } from "./destinations";

/**
 * The signature 3D globe — hand-written plain Three.js in a useEffect.
 * This module is the ONLY thing that pulls in Three.js and is imported lazily,
 * so the ~470KB never ships in the main bundle.
 *
 * Layers (bottom→top): starfield · solid inner sphere · lat/long graticule ·
 * golden fresnel atmosphere · city markers with pulsing rings · flight arcs
 * with travelling comet + fading trail. rAF spins it and eases toward the
 * pointer; a single GLSL fresnel shader draws the atmosphere.
 */

const RADIUS = 1.6;
const GOLD = new THREE.Color("#E8B04B");
const CORAL = new THREE.Color("#FF8A5B");

function toVec(lat: number, lon: number, radius = RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function makeArc(a: THREE.Vector3, b: THREE.Vector3): THREE.QuadraticBezierCurve3 {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const dist = a.distanceTo(b);
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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";

    // Starfield (parallax depth behind the globe).
    scene.add(buildStars());

    const world = new THREE.Group();
    world.rotation.x = 0.32;
    scene.add(world);

    // Solid inner sphere — occludes far-side arcs.
    world.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 0.99, 64, 64),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("#0A1020") })
      )
    );

    // Graticule.
    world.add(buildGraticule());

    // Golden fresnel atmosphere — the one GLSL in the project.
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.22, 64, 64),
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
            float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
            gl_FragColor = vec4(uColor, 1.0) * intensity;
          }`,
      })
    );
    scene.add(atmosphere);

    const originVec = toVec(ORIGIN.lat, ORIGIN.lon);

    type Ring = { mesh: THREE.Mesh; phase: number };
    const rings: Ring[] = [];
    const addMarker = (pos: THREE.Vector3, color: THREE.Color, size: number, phase: number) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(size, 16, 16),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.copy(pos);
      world.add(dot);
      // Pulsing ring, oriented tangent to the surface.
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(size * 1.6, size * 2.1, 28),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        })
      );
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      world.add(ring);
      rings.push({ mesh: ring, phase });
    };

    addMarker(originVec, GOLD, 0.055, 0);

    type CometTrack = {
      curve: THREE.QuadraticBezierCurve3;
      head: THREE.Mesh;
      trail: THREE.Line;
      offset: number;
    };
    const comets: CometTrack[] = [];

    DESTINATIONS.forEach((dest: GeoPoint, i: number) => {
      const destVec = toVec(dest.lat, dest.lon);
      addMarker(destVec, i % 2 ? CORAL : GOLD, 0.032, (i / DESTINATIONS.length) * Math.PI * 2);

      const curve = makeArc(originVec, destVec);
      const pts = curve.getPoints(64);
      world.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.28 })
        )
      );

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 12, 12),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("#FFF6E4") })
      );
      world.add(head);

      // Short fading trail behind the comet head.
      const trailGeo = new THREE.BufferGeometry().setFromPoints(
        new Array(14).fill(0).map(() => new THREE.Vector3())
      );
      const trail = new THREE.Line(
        trailGeo,
        new THREE.LineBasicMaterial({
          color: GOLD,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        })
      );
      world.add(trail);

      comets.push({ curve, head, trail, offset: i / DESTINATIONS.length });
    });

    // Interaction — ease toward pointer.
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.7;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.45;
    };
    window.addEventListener("pointermove", onPointer);

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

    const updateComet = (c: CometTrack, t: number) => {
      const p = (t * 0.16 + c.offset) % 1;
      const pt = c.curve.getPointAt(p);
      c.head.position.copy(pt);
      c.head.scale.setScalar(0.5 + Math.sin(p * Math.PI) * 1.1);
      const trailPts: THREE.Vector3[] = [];
      for (let k = 0; k < 14; k++) {
        const tp = Math.max(p - k * 0.012, 0);
        trailPts.push(c.curve.getPointAt(tp));
      }
      c.trail.geometry.setFromPoints(trailPts);
    };

    const renderOnce = () => renderer.render(scene, camera);

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();

      world.rotation.y += 0.0015;
      world.rotation.x += (0.32 + target.y - world.rotation.x) * 0.05;
      world.rotation.z += (target.x * 0.14 - world.rotation.z) * 0.05;

      for (const c of comets) updateComet(c, t);

      // Pulsing rings.
      for (const r of rings) {
        const s = 1 + (Math.sin(t * 2 + r.phase) * 0.5 + 0.5) * 0.9;
        r.mesh.scale.setScalar(s);
        (r.mesh.material as THREE.MeshBasicMaterial).opacity =
          0.5 * (1 - (s - 1) / 0.9);
      }

      renderOnce();
      raf = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      for (const c of comets) updateComet(c, 3);
      renderOnce();
    } else {
      raf = requestAnimationFrame(tick);
    }

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
        const any = obj as THREE.Mesh | THREE.Line | THREE.Points;
        if ((any as THREE.Mesh).geometry) (any as THREE.Mesh).geometry.dispose();
        const m = (any as THREE.Mesh).material as
          | THREE.Material
          | THREE.Material[]
          | undefined;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
        else m?.dispose();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}

/** Star points on a large sphere. */
function buildStars(): THREE.Points {
  const count = 900;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 14 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color: new THREE.Color("#93A0C0"),
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
    })
  );
}

/** Latitude + longitude ring lines. */
function buildGraticule(): THREE.LineSegments {
  const positions: number[] = [];
  const step = 6;
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = -180; lon < 180; lon += step) {
      const a = toVec(lat, lon, RADIUS);
      const b = toVec(lat, lon + step, RADIUS);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
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
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.13 })
  );
}
