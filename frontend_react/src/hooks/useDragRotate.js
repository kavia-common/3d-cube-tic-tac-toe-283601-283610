import { useRef, useState, useCallback, useEffect } from 'react';

// PUBLIC_INTERFACE
export function useDragRotate({ initial = { x: -18, y: 24 }, onRelease, reducedMotion = false } = {}) {
  /**
   * Hook to track pointer drag and produce rotation {x, y} for a 3D cube.
   * - initial: starting angles
   * - onRelease: callback invoked on pointer up
   * - reducedMotion: skips RAF smoothing
   */
  const [rotation, setRotation] = useState(initial);
  const draggingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    draggingRef.current = true;
    lastRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastRef.current.x;
    const dy = e.clientY - lastRef.current.y;
    lastRef.current = { x: e.clientX, y: e.clientY };

    const upd = (prev) => ({
      x: prev.x + (reducedMotion ? dy : dy * 0.7),
      y: prev.y + (reducedMotion ? dx : dx * 0.7),
    });

    if (reducedMotion) {
      setRotation(upd);
    } else {
      // use rAF for smoothness
      requestAnimationFrame(() => setRotation(upd));
    }
  }, [reducedMotion]);

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (onRelease) onRelease();
  }, [onRelease]);

  useEffect(() => {
    const onLeave = () => {
      if (draggingRef.current) {
        draggingRef.current = false;
        if (onRelease) onRelease();
      }
    };
    window.addEventListener('pointerup', onLeave);
    window.addEventListener('pointercancel', onLeave);
    return () => {
      window.removeEventListener('pointerup', onLeave);
      window.removeEventListener('pointercancel', onLeave);
    };
  }, [onRelease]);

  return {
    rotation,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
}
