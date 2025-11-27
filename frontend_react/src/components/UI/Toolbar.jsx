import React from 'react';
import { useGame } from '../../state/GameContext';
import ToggleSwitch from './ToggleSwitch';

// PUBLIC_INTERFACE
export default function Toolbar({ theme, onToggleTheme }) {
  /**
   * Top toolbar with app title, theme toggle, explode/collapse, and reset controls.
   */
  const { state, actions } = useGame();

  return (
    <div className="toolbar">
      <div className="toolbar-title">
        <span className="accent">Cube</span> Tic Tac Toe
      </div>
      <div className="toolbar-actions">
        <button
          className="btn"
          onClick={() => actions.toggleExploded()}
          aria-pressed={state.exploded}
        >
          {state.exploded ? 'Collapse' : 'Explode'}
        </button>
        <button
          className="btn warning"
          onClick={() => actions.resetGame()}
          aria-label="Reset game"
        >
          Reset
        </button>
        <ToggleSwitch
          checked={theme === 'dark'}
          onChange={onToggleTheme}
          label={theme === 'dark' ? 'Dark' : 'Light'}
        />
      </div>
    </div>
  );
}
