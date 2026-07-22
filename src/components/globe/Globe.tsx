import { useEffect, useRef } from "react";
import * as THREE from "three";
import dayTexUrl from "@/assets/globe/earth-day.webp";
import nightTexUrl from "@/assets/globe/earth-night.webp";
import specTexUrl from "@/assets/globe/earth-spec.webp";
import cloudsTexUrl from "@/assets/globe/earth-clouds.webp";

/**
 * Photorealistic Earth globe — ported from the approved Flyworld globe design.
 * Day/night (city-lights) + specular water + cloud shaders, 23° axial tilt,
 * slow spin, cursor parallax, drag-to-orbit, wheel zoom, a pulsing Ahmedabad
 * origin, destination markers, gold flight-arc tubes and little airliners that
 * fly the routes. Plain Three.js in a useEffect; lazy-loaded so it never ships
 * in the main bundle.
 */
export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DEG = Math.PI / 180;

    const w = host.clientWidth || 640;
    const h = host.clientHeight || 640;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    // Resting distance sized so the Earth sits large but fully inside its
    // square frame (between the two reference sizes); MIN_Z below is the
    // closest zoom that still keeps the whole sphere visible (no clipping).
    camera.position.set(0, 0, 3.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL — parent shows CSS fallback
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
    host.style.cursor = "grab";
    host.style.touchAction = "none";
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // ---- groups: parallax > orbit(drag) > tilt(axial) > spin ----
    const parallax = new THREE.Group();
    const orbit = new THREE.Group();
    const tilt = new THREE.Group();
    tilt.rotation.z = 23 * DEG;
    const spin = new THREE.Group();
    parallax.add(orbit);
    orbit.add(tilt);
    tilt.add(spin);
    scene.add(parallax);
    spin.rotation.y = -3.15; // India toward the front-left, near the terminator

    const sunDir = new THREE.Vector3(0.6, 0.25, 0.66).normalize();
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.2);
    sun.position.copy(sunDir).multiplyScalar(6);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x8fa2c8, 0.5);
    fill.position.copy(sunDir).multiplyScalar(-6);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x33445f, 0.75));

    // ---- textures ----
    const loader = new THREE.TextureLoader();
    let dirty = true;
    const tex = (u: string) =>
      loader.load(u, (t) => {
        if (t) t.anisotropy = maxAniso;
        dirty = true;
      });
    const dayTex = tex(dayTexUrl);
    const nightTex = tex(nightTexUrl);
    const specTex = tex(specTexUrl);
    const cloudsTex = tex(cloudsTexUrl);

    // ---- earth ----
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        dayTex: { value: dayTex },
        nightTex: { value: nightTex },
        specTex: { value: specTex },
        sunDir: { value: sunDir },
      },
      vertexShader: `varying vec2 vUv; varying vec3 vWN; varying vec3 vWP;
        void main(){ vUv=uv; vWN=normalize(mat3(modelMatrix)*normal);
          vec4 wp=modelMatrix*vec4(position,1.0); vWP=wp.xyz;
          gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader: `uniform sampler2D dayTex,nightTex,specTex; uniform vec3 sunDir;
        varying vec2 vUv; varying vec3 vWN; varying vec3 vWP;
        void main(){
          vec3 N=normalize(vWN); vec3 L=normalize(sunDir);
          float d=dot(N,L); float t=smoothstep(0.42,0.92,d);
          vec3 day=texture2D(dayTex,vUv).rgb;
          vec3 night=texture2D(nightTex,vUv).rgb*1.7;
          vec3 darkside=night+day*0.14;
          vec3 col=mix(darkside,day,t);
          col=max(col,day*0.08);
          float water=texture2D(specTex,vUv).r;
          vec3 V=normalize(cameraPosition-vWP);
          vec3 H=normalize(L+V);
          float spec=pow(max(dot(N,H),0.0),30.0)*water*clamp(d,0.0,1.0);
          col+=vec3(1.0,0.94,0.78)*spec*0.9;
          float term=smoothstep(0.0,0.14,d)-smoothstep(0.14,0.5,d);
          col+=vec3(0.91,0.69,0.29)*max(term,0.0)*0.12;
          gl_FragColor=vec4(col,1.0);
        }`,
    });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 128), earthMat);
    spin.add(earth);

    // ---- clouds ----
    const cloudMat = new THREE.ShaderMaterial({
      uniforms: { cloudsTex: { value: cloudsTex }, sunDir: { value: sunDir } },
      transparent: true,
      depthWrite: false,
      vertexShader: `varying vec2 vUv; varying vec3 vWN;
        void main(){ vUv=uv; vWN=normalize(mat3(modelMatrix)*normal);
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `uniform sampler2D cloudsTex; uniform vec3 sunDir;
        varying vec2 vUv; varying vec3 vWN;
        void main(){ float c=texture2D(cloudsTex,vUv).a;
          float lit=smoothstep(-0.12,0.40,dot(normalize(vWN),normalize(sunDir)));
          gl_FragColor=vec4(vec3(0.94,0.95,0.98), c*(0.10+0.90*lit)*0.62); }`,
    });
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.008, 96, 96), cloudMat);
    spin.add(clouds);

    // ---- atmosphere (gold fresnel) ----
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { glow: { value: new THREE.Color(0xe8b04b) } },
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `varying vec3 vWN; varying vec3 vWP;
        void main(){ vWN=normalize(mat3(modelMatrix)*normal);
          vec4 wp=modelMatrix*vec4(position,1.0); vWP=wp.xyz;
          gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader: `uniform vec3 glow; varying vec3 vWN; varying vec3 vWP;
        void main(){ vec3 V=normalize(cameraPosition-vWP);
          float f=pow(1.0-abs(dot(V,normalize(vWN))),3.4);
          gl_FragColor=vec4(glow, f*0.95); }`,
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.16, 64, 64), atmoMat);
    atmo.visible = false; // no gold halo ring — Earth only (matches reference)
    parallax.add(atmo);

    // ---- lat/lon -> vec3 ----
    const ll = (lat: number, lon: number, r = 1) => {
      const phi = (90 - lat) * DEG,
        theta = (lon + 180) * DEG;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const ORIGIN = { lat: 23.02, lon: 72.57 }; // Ahmedabad
    const DEST = [
      { lat: 51.51, lon: -0.13 }, // London
      { lat: 52.52, lon: 13.4 }, // Berlin
      { lat: 48.85, lon: 2.35 }, // Paris
      { lat: 25.2, lon: 55.27 }, // Dubai
      { lat: 1.35, lon: 103.82 }, // Singapore
      { lat: -33.87, lon: 151.21 }, // Sydney
      { lat: 43.65, lon: -79.38 }, // Toronto
      { lat: 40.71, lon: -74.01 }, // New York
      { lat: -23.55, lon: -46.63 }, // São Paulo
      { lat: -26.2, lon: 28.05 }, // Johannesburg
    ];

    // ---- markers ----
    const originVec = ll(ORIGIN.lat, ORIGIN.lon, 1.006);
    const originDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff8a5b, transparent: true })
    );
    originDot.position.copy(originVec);
    spin.add(originDot);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.017, 0.023, 24),
      new THREE.MeshBasicMaterial({
        color: 0xff8a5b,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.6,
      })
    );
    ring.position.copy(originVec);
    ring.lookAt(originVec.clone().multiplyScalar(2));
    spin.add(ring);

    const destMat = new THREE.MeshBasicMaterial({ color: 0xe8b04b });
    DEST.forEach((d) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.007, 12, 12), destMat);
      m.position.copy(ll(d.lat, d.lon, 1.006));
      spin.add(m);
    });

    // ---- arcs + planes ----
    const slerp = (a: THREE.Vector3, b: THREE.Vector3, t: number) => {
      const s = a.clone().normalize(),
        e = b.clone().normalize();
      const om = Math.acos(Math.max(-1, Math.min(1, s.dot(e))));
      if (om < 1e-4) return s;
      const k1 = Math.sin((1 - t) * om) / Math.sin(om),
        k2 = Math.sin(t * om) / Math.sin(om);
      return s.multiplyScalar(k1).add(e.multiplyScalar(k2));
    };
    const arcMat = new THREE.MeshBasicMaterial({
      color: 0xe8b04b,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const planeMat = new THREE.MeshStandardMaterial({ color: 0xf8f6f0, metalness: 0.08, roughness: 0.42, transparent: true });
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xe7c486, metalness: 0.12, roughness: 0.38, transparent: true });
    const engMat = new THREE.MeshStandardMaterial({ color: 0xc2c6cf, metalness: 0.18, roughness: 0.34, transparent: true });

    const buildPlane = (bodyMat: THREE.Material, accentMat: THREE.Material, nacMat: THREE.Material) => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.0036, 0.0046, 0.052, 14), bodyMat);
      body.rotation.x = Math.PI / 2;
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.0036, 0.02, 14), bodyMat);
      nose.rotation.x = Math.PI / 2;
      nose.position.z = 0.036;
      const tailCone = new THREE.Mesh(new THREE.ConeGeometry(0.0046, 0.014, 14), bodyMat);
      tailCone.rotation.x = -Math.PI / 2;
      tailCone.position.z = -0.033;
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0.006);
      wingShape.lineTo(0.044, -0.012);
      wingShape.lineTo(0.044, -0.017);
      wingShape.lineTo(0, -0.007);
      wingShape.lineTo(0, 0.006);
      const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.0016, bevelEnabled: false });
      const wingR = new THREE.Mesh(wingGeo, accentMat);
      wingR.position.set(0.004, -0.0018, 0.002);
      const wingL = new THREE.Mesh(wingGeo, accentMat);
      wingL.position.set(-0.004, -0.0018, 0.002);
      wingL.scale.x = -1;
      const wingletShape = new THREE.Shape();
      wingletShape.moveTo(0, 0);
      wingletShape.lineTo(0.009, -0.004);
      wingletShape.lineTo(0.009, -0.008);
      wingletShape.lineTo(0, -0.006);
      wingletShape.lineTo(0, 0);
      const wingletGeo = new THREE.ExtrudeGeometry(wingletShape, { depth: 0.0012, bevelEnabled: false });
      const wgR = new THREE.Mesh(wingletGeo, accentMat);
      wgR.position.set(0.048, 0, -0.0132);
      wgR.rotation.z = -0.9;
      wgR.rotation.y = -0.2;
      const wgL = new THREE.Mesh(wingletGeo, accentMat);
      wgL.position.set(-0.048, 0, -0.0132);
      wgL.rotation.z = 0.9;
      wgL.rotation.y = 0.2;
      const engGeo = new THREE.CylinderGeometry(0.0034, 0.0038, 0.019, 12);
      const engines = [
        [0.02, -0.002],
        [-0.02, -0.002],
      ].map(([x, z]) => {
        const e = new THREE.Mesh(engGeo, nacMat);
        e.rotation.x = Math.PI / 2;
        e.position.set(x, -0.005, z + 0.006);
        return e;
      });
      const stabShape = new THREE.Shape();
      stabShape.moveTo(0, 0.004);
      stabShape.lineTo(0.02, -0.006);
      stabShape.lineTo(0.02, -0.009);
      stabShape.lineTo(0, -0.004);
      stabShape.lineTo(0, 0.004);
      const stabGeo = new THREE.ExtrudeGeometry(stabShape, { depth: 0.0014, bevelEnabled: false });
      const stabR = new THREE.Mesh(stabGeo, accentMat);
      stabR.position.set(0.003, -0.0012, -0.03);
      const stabL = new THREE.Mesh(stabGeo, accentMat);
      stabL.position.set(-0.003, -0.0012, -0.03);
      stabL.scale.x = -1;
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(0, 0.014);
      finShape.lineTo(-0.013, 0.014);
      finShape.lineTo(-0.005, 0);
      finShape.lineTo(0, 0);
      const fin = new THREE.Mesh(new THREE.ExtrudeGeometry(finShape, { depth: 0.0013, bevelEnabled: false }), accentMat);
      fin.rotation.y = Math.PI / 2;
      fin.position.set(0.0007, 0.001, -0.03);
      g.add(body, nose, tailCone, wingR, wingL, wgR, wgL, ...engines, stabR, stabL, fin);
      return g;
    };

    type PlaneTrack = {
      curve: THREE.CatmullRomCurve3;
      mesh: THREE.Group;
      mat: THREE.MeshStandardMaterial;
      mat2: THREE.MeshStandardMaterial;
      mat3: THREE.MeshStandardMaterial;
      duration: number;
      phase: number;
    };
    const planes: PlaneTrack[] = [];
    // Deterministic pseudo-random (Date/Math.random-free is not required here, but
    // keep it varied per index without relying on shared globals).
    const rand = (i: number, s: number) => ((Math.sin(i * 12.9898 + s * 78.233) * 43758.5453) % 1 + 1) % 1;

    DEST.forEach((d, i) => {
      const a = ll(ORIGIN.lat, ORIGIN.lon, 1),
        b = ll(d.lat, d.lon, 1);
      const om = Math.acos(Math.max(-1, Math.min(1, a.clone().normalize().dot(b.clone().normalize()))));
      const height = 0.05 + om * 0.09;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 64; s++) {
        const t = s / 64;
        const p = slerp(a, b, t);
        const lift = Math.sin(t * Math.PI) * height;
        pts.push(p.normalize().multiplyScalar(1 + lift));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.0038, 8, false), arcMat);
      spin.add(tube);

      const pmat = planeMat.clone();
      const amat = wingMat.clone();
      const nmat = engMat.clone();
      const plane = buildPlane(pmat, amat, nmat);
      plane.visible = false;
      spin.add(plane);
      planes.push({
        curve,
        mesh: plane,
        mat: pmat,
        mat2: amat,
        mat3: nmat,
        duration: 15 + rand(i, 1) * 10,
        phase: rand(i, 2),
      });
    });

    // ---- interaction ----
    const target = { x: 0, y: 0 };
    let drag = false;
    let lastX = 0,
      lastY = 0;
    const onMove = (e: PointerEvent) => {
      if (drag) {
        const dx = e.clientX - lastX,
          dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        orbit.rotation.y += dx * 0.005;
        orbit.rotation.x = Math.max(-1.2, Math.min(1.2, orbit.rotation.x + dy * 0.005));
        dirty = true;
        return;
      }
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.x = ny * 0.12;
      target.y = nx * 0.16;
    };
    const onDown = (e: PointerEvent) => {
      drag = true;
      lastX = e.clientX;
      lastY = e.clientY;
      host.style.cursor = "grabbing";
    };
    const onUp = () => {
      if (drag) {
        drag = false;
        host.style.cursor = "grab";
      }
    };
    // Closest zoom is clamped so the Earth never grows past the square frame
    // and gets clipped. With fov 40°, the sphere (r=1) fits while z >= ~2.9.
    const MIN_Z = 2.9;
    const MAX_Z = 6;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(MIN_Z, Math.min(MAX_Z, camera.position.z + e.deltaY * 0.0022));
      dirty = true;
    };
    window.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    host.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(() => {
      const nw = host.clientWidth,
        nh = host.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      dirty = true;
    });
    ro.observe(host);

    // ---- loop ----
    const clock = new THREE.Clock();
    const m4 = new THREE.Matrix4();
    let t = 0;
    let raf = 0;
    let running = true;

    const step = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;
      spin.rotation.y += dt * ((2 * Math.PI) / 80);
      clouds.rotation.y += dt * ((2 * Math.PI) / 80) * 0.22;
      parallax.rotation.x += (target.x - parallax.rotation.x) * 0.04;
      parallax.rotation.y += (target.y - parallax.rotation.y) * 0.04;

      originDot.scale.setScalar(1 + 0.35 * Math.sin(t * 3));
      ring.scale.setScalar(1 + 0.5 * (0.5 + 0.5 * Math.sin(t * 3)));
      (ring.material as THREE.MeshBasicMaterial).opacity = 0.55 * (0.6 - 0.4 * Math.sin(t * 3));

      planes.forEach((p) => {
        const u = (t / p.duration + p.phase) % 1;
        if (u < 0.82) {
          const tt = u / 0.82;
          const pos = p.curve.getPointAt(tt);
          const tan = p.curve.getTangentAt(tt).normalize();
          const radial = pos.clone().normalize();
          const right = new THREE.Vector3().crossVectors(radial, tan).normalize();
          const upv = new THREE.Vector3().crossVectors(tan, right).normalize();
          m4.makeBasis(right, upv, tan);
          p.mesh.quaternion.setFromRotationMatrix(m4);
          p.mesh.position.copy(pos);
          const tan2 = p.curve.getTangentAt(Math.min(1, tt + 0.02)).normalize();
          const turn = new THREE.Vector3().crossVectors(tan, tan2).dot(radial);
          p.mesh.rotateZ(THREE.MathUtils.clamp(-turn * 9, -0.5, 0.5));
          const fade = Math.min(1, tt / 0.12) * Math.min(1, (1 - tt) / 0.12);
          p.mat.opacity = fade;
          p.mat2.opacity = fade;
          p.mat3.opacity = fade;
          p.mesh.visible = true;
        } else {
          p.mesh.visible = false;
        }
      });

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      clock.getDelta();
      renderer.render(scene, camera);
      // render a few frames as textures decode
      const settle = setInterval(() => {
        if (dirty) {
          dirty = false;
          renderer.render(scene, camera);
        }
      }, 250);
      setTimeout(() => clearInterval(settle), 3000);
    } else {
      raf = requestAnimationFrame(animate);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion && !running) {
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        const any = obj as THREE.Mesh;
        if (any.geometry) any.geometry.dispose();
        const m = (any as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
        else m?.dispose();
      });
      [dayTex, nightTex, specTex, cloudsTex].forEach((tx) => tx.dispose());
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
