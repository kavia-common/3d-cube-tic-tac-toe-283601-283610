import React from 'react';
import { useGame } from '../../state/GameContext';

// PUBLIC_INTERFACE
export default function MoveHistory() {
  /** Shows the move list with face/cell and player. */
  const { state } = useGame();

  return (
    <div className="panel" aria-label="Move history">
      <div className="panel-header">
        <strong>Move History</strong>
        <span className="meta">{state.moveHistory.length} moves</span>
      </div>
      <div className="panel-content">
        <ul className="history-list">
          {state.moveHistory.map(m => (
            <li key={m.id} className="history-item">
              <span>#{m.id} — {m.player}</span>
              <span className="meta">Face {m.face + 1}, Cell {m.cell + 1}</span>
            </li>
          ))}
          {state.moveHistory.length === 0 && (
            <li className="history-item">
              <span className="meta">No moves yet</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
