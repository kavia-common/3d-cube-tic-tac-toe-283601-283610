import React, { useCallback, useState } from 'react';
import { useGame } from '../../state/GameContext';
import { Cell } from './Cell';
import { FACE_STATUS } from '../../state/gameReducer';

// PUBLIC_INTERFACE
export function Face({ faceIndex, transform, cells, exploded }) {
  /**
   * A single cube face (3x3 grid).
   * - When exploded, cells can be clicked/keyboard activated to place a mark.
   * - Keyboard arrows move focus among cells; Enter/Space places a mark.
   */
  const { state, actions } = useGame();
  const [focusIndex, setFocusIndex] = useState(0);

  const disabled = state.faceStatus[faceIndex] !== FACE_STATUS.ACTIVE;

  const handleCellClick = useCallback((cellIndex) => {
    if (!exploded || disabled) return;
    actions.placeMark(faceIndex, cellIndex);
  }, [actions, exploded, disabled, faceIndex]);

  const onKeyDown = useCallback((e) => {
    if (!exploded) return;
    const row = Math.floor(focusIndex / 3);
    const col = focusIndex % 3;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setFocusIndex(((row * 3) + ((col + 1) % 3)));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setFocusIndex(((row * 3) + ((col + 2) % 3)));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((((row + 1) % 3) * 3) + col);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((((row + 2) % 3) * 3) + col);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCellClick(focusIndex);
    }
  }, [exploded, focusIndex, handleCellClick]);

  return (
    <div
      className="cube-face"
      style={{ transform }}
      role="grid"
      aria-label={`Face ${faceIndex + 1}`}
      aria-disabled={disabled ? 'true' : 'false'}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="face-label">Face {faceIndex + 1}</div>
      {cells.map((val, idx) => (
        <Cell
          key={idx}
          faceIndex={faceIndex}
          index={idx}
          value={val}
          focused={idx === focusIndex}
          onClick={() => handleCellClick(idx)}
          disabled={!exploded || disabled}
        />
      ))}
    </div>
  );
}
