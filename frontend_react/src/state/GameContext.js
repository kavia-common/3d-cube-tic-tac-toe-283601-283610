import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { gameReducer, initialState, ACTIONS } from './gameReducer';

const GameContext = createContext(null);

// PUBLIC_INTERFACE
export function useGame() {
  /** Hook to access game state and actions. */
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within GameProvider');
  }
  return ctx;
}

// PUBLIC_INTERFACE
export function GameProvider({ children }) {
  /** Provides game state and actions via context. */
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const actions = useMemo(() => ({
    resetGame: () => dispatch({ type: ACTIONS.RESET_GAME }),
    toggleExploded: () => dispatch({ type: ACTIONS.TOGGLE_EXPLODED }),
    setExploded: (val) => dispatch({ type: ACTIONS.SET_EXPLODED, payload: !!val }),
    placeMark: (face, cell) => dispatch({ type: ACTIONS.PLACE_MARK, payload: { face, cell } }),
  }), []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
