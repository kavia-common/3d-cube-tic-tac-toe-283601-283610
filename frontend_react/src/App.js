import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import { GameProvider } from './state/GameContext';
import Toolbar from './components/UI/Toolbar';
import { Cube } from './components/Cube/Cube';
import Scoreboard from './components/Scoreboard/Scoreboard';
import MoveHistory from './components/MoveHistory/MoveHistory';

// PUBLIC_INTERFACE
function App() {
  /** Root app component: layout + theming + providers */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (val) => {
    setTheme((prev) => typeof val === 'boolean' ? (val ? 'dark' : 'light') : (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <GameProvider>
      <div className="app-shell">
        <Toolbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="main-grid" role="main">
          <section className="panel" aria-label="3D Cube Section">
            <div className="panel-header">
              <strong>3D Cube</strong>
              <span className="meta">Drag to rotate. Click Explode to play.</span>
            </div>
            <div className="panel-content">
              <Cube />
            </div>
          </section>
          <aside>
            <Scoreboard />
            <div style={{ height: 16 }} />
            <MoveHistory />
          </aside>
        </main>
      </div>
    </GameProvider>
  );
}

export default App;
