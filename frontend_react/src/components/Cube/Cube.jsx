import React, { useMemo } from 'react';
import './Cube.css';
import { Face } from './Face';
import { useGame } from '../../state/GameContext';
import { useDragRotate } from '../../hooks/useDragRotate';
import { getFeatureFlags } from '../../utils/featureFlags';

// PUBLIC_INTERFACE
export function Cube() {
  /**
   * 3D Cube with drag-to-rotate. In exploded mode, faces translate outward to enable clicking cells.
   * Keyboard interaction is handled at the face component level.
   */
  const { state, actions } = useGame();
  const flags = useMemo(() => getFeatureFlags(), []);

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { rotation, bind } = useDragRotate({
    onRelease: () => {
      if (flags.explodeOnRelease) {
        actions.setExploded(true);
      }
    },
    reducedMotion,
  });

  const facesTransforms = useMemo(() => {
    const base = 0.5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cube-size')) || 140;
    const explodeOffset = state.exploded ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cube-explode')) || 60) : 0;

    return [
      `rotateY(0deg) translateZ(${base + explodeOffset}px)`,      // front
      `rotateY(90deg) translateZ(${base + explodeOffset}px)`,     // right
      `rotateY(180deg) translateZ(${base + explodeOffset}px)`,    // back
      `rotateY(-90deg) translateZ(${base + explodeOffset}px)`,    // left
      `rotateX(90deg) translateZ(${base + explodeOffset}px)`,     // top
      `rotateX(-90deg) translateZ(${base + explodeOffset}px)`,    // bottom
    ];
  }, [state.exploded]);

  return (
    <div className="cube-scene" aria-label="3D Tic Tac Toe cube scene">
      <div
        className="cube"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        {...bind}
        role="region"
        aria-roledescription="3D cube"
        aria-label={`3D cube rotated X ${Math.round(rotation.x)} degrees, Y ${Math.round(rotation.y)} degrees`}
      >
        {state.faces.map((cells, faceIndex) => (
          <Face
            key={faceIndex}
            faceIndex={faceIndex}
            transform={facesTransforms[faceIndex]}
            cells={cells}
            exploded={state.exploded}
          />
        ))}
      </div>
    </div>
  );
}
