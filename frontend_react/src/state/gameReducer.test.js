import { gameReducer, initialState, ACTIONS, FACE_STATUS } from './gameReducer';

function reduce(state, action) {
  return gameReducer(state, action);
}

test('toggle exploded', () => {
  const s1 = reduce(initialState, { type: ACTIONS.TOGGLE_EXPLODED });
  expect(s1.exploded).toBe(true);
  const s2 = reduce(s1, { type: ACTIONS.TOGGLE_EXPLODED });
  expect(s2.exploded).toBe(false);
});

test('place mark only works when exploded', () => {
  const s1 = reduce(initialState, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 0 } });
  // Not exploded; should be ignored
  expect(s1.faces[0][0]).toBe(null);

  const s2 = reduce(initialState, { type: ACTIONS.SET_EXPLODED, payload: true });
  const s3 = reduce(s2, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 0 } });
  expect(s3.faces[0][0]).toBe('X');
  expect(s3.currentPlayer).toBe('O');
});

test('win updates face status and score', () => {
  let s = reduce(initialState, { type: ACTIONS.SET_EXPLODED, payload: true });
  // X makes row 0 win on face 0
  s = reduce(s, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 0 } }); // X
  s = reduce(s, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 3 } }); // O
  s = reduce(s, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 1 } }); // X
  s = reduce(s, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 4 } }); // O
  s = reduce(s, { type: ACTIONS.PLACE_MARK, payload: { face: 0, cell: 2 } }); // X wins

  expect(s.faceStatus[0]).toBe(FACE_STATUS.WON_X);
  expect(s.scores.X).toBe(1);
});
