import { computeWinner, isDraw } from '../utils/winLogic';

export const ACTIONS = {
  PLACE_MARK: 'PLACE_MARK',
  RESET_GAME: 'RESET_GAME',
  TOGGLE_EXPLODED: 'TOGGLE_EXPLODED',
  SET_EXPLODED: 'SET_EXPLODED',
};

export const FACE_STATUS = {
  ACTIVE: 'active',
  WON_X: 'wonX',
  WON_O: 'wonO',
  DRAW: 'draw',
};

export const initialState = {
  faces: Array.from({ length: 6 }, () => Array(9).fill(null)),
  faceStatus: Array(6).fill(FACE_STATUS.ACTIVE),
  currentPlayer: 'X',
  exploded: false,
  moveHistory: [],
  scores: {
    X: 0,
    O: 0,
    draws: 0,
  },
};

function nextPlayer(p) {
  return p === 'X' ? 'O' : 'X';
}

// PUBLIC_INTERFACE
export function gameReducer(state, action) {
  /**
   * Reducer for 3D cube Tic Tac Toe.
   * Actions:
   * - PLACE_MARK: { face, cell }
   * - RESET_GAME
   * - TOGGLE_EXPLODED
   * - SET_EXPLODED: boolean
   */
  switch (action.type) {
    case ACTIONS.PLACE_MARK: {
      const { face, cell } = action.payload || {};
      if (typeof face !== 'number' || typeof cell !== 'number') return state;

      // Only allow marking in exploded mode and on active faces
      if (!state.exploded) return state;
      if (state.faceStatus[face] !== FACE_STATUS.ACTIVE) return state;

      const faceCells = state.faces[face];
      if (faceCells[cell]) return state; // already filled

      const player = state.currentPlayer;

      // clone state
      const faces = state.faces.map((f, i) => i === face ? [...f] : f);
      faces[face][cell] = player;

      // determine result
      let faceStatus = [...state.faceStatus];
      let scores = { ...state.scores };

      const winner = computeWinner(faces[face]);
      if (winner) {
        faceStatus[face] = winner === 'X' ? FACE_STATUS.WON_X : FACE_STATUS.WON_O;
        scores[winner] += 1;
      } else if (isDraw(faces[face])) {
        faceStatus[face] = FACE_STATUS.DRAW;
        scores.draws += 1;
      }

      const moveHistory = [
        ...state.moveHistory,
        { id: state.moveHistory.length + 1, face, cell, player }
      ];

      return {
        ...state,
        faces,
        faceStatus,
        scores,
        moveHistory,
        currentPlayer: nextPlayer(player),
      };
    }

    case ACTIONS.RESET_GAME:
      return initialState;

    case ACTIONS.TOGGLE_EXPLODED:
      return { ...state, exploded: !state.exploded };

    case ACTIONS.SET_EXPLODED:
      return { ...state, exploded: !!action.payload };

    default:
      return state;
  }
}
