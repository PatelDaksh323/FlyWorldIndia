import { Suspense, lazy, useEffect, useState } from "react";
import GlobeFallback from "./GlobeFallback";

// Code-split: the Three.js bundle only downloads when this renders (PRD H-2).
const Globe = lazy(() => import("./Globe"));

/** Cheap WebGL capability probe. */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Renders the real globe only when (a) WebGL exists and (b) we're past first
 * paint. Otherwise the lightweight CSS fallback stands in. This keeps the
 * globe off the critical path so it never blocks LCP.
 */
export default function LazyGlobe() {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(hasWebGL());
    // Defer to idle so the hero text paints first.
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!webgl || !ready) return <GlobeFallback />;

  return (
    <Suspense fallback={<GlobeFallback />}>
      <Globe />
    </Suspense>
  );
}
