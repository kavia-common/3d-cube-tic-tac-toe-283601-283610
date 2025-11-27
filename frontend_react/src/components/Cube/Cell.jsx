import React from 'react';
import XIcon from '../../assets/icons/x.svg';
import OIcon from '../../assets/icons/o.svg';

// PUBLIC_INTERFACE
export function Cell({ value, onClick, disabled, focused, faceIndex, index }) {
  /**
   * A single 3x3 grid cell with accessible roles and mark rendering.
   */
  const label = `Face ${faceIndex + 1} cell ${index + 1}: ${value ? value : 'Empty'}`;
  return (
    <button
      type="button"
      className="cell"
      role="gridcell"
      aria-label={label}
      aria-disabled={disabled ? 'true' : 'false'}
      onClick={onClick}
      disabled={disabled}
      data-testid={`cell-${faceIndex}-${index}`}
      tabIndex={focused ? 0 : -1}
    >
      {value ? (
        <span className={`mark ${value === 'X' ? 'x' : 'o'}`} aria-hidden="true">
          {value === 'X' ? <XIcon /> : <OIcon />}
        </span>
      ) : null}
      <span className="visually-hidden">{value || ''}</span>
    </button>
  );
}
