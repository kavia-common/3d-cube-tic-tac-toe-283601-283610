import React from 'react';
import { useGame } from '../../state/GameContext';

// PUBLIC_INTERFACE
export default function Scoreboard() {
  /** Displays X/O scores, draws, and current player indicator. */
  const { state } = useGame();
  const { X, O, draws } = state.scores;

  return (
    <div className="panel">
      <div className="panel-header">
        <strong>Scoreboard</strong>
      </div>
      <div className="panel-content">
        <div className="scoreboard">
          <div className="score-card">
            <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>X</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{X}</div>
          </div>
          <div className="score-card o">
            <div style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>O</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{O}</div>
          </div>
          <div className="score-card draw">
            <div style={{ fontWeight: 700, color: 'var(--muted)' }}>Draws</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{draws}</div>
          </div>
        </div>
        <div className="current-player" aria-live="polite">
          Current: {state.currentPlayer}
        </div>
      </div>
    </div>
  );
}
