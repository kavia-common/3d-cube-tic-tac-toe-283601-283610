import { computeWinner, isDraw, getWinningLine } from './winLogic';

test('detects horizontal win', () => {
  const board = ['X','X','X', null, null, null, null, null, null];
  expect(computeWinner(board)).toBe('X');
  expect(getWinningLine(board)).toEqual([0,1,2]);
});

test('detects diagonal win', () => {
  const board = ['O', null, null, null, 'O', null, null, null, 'O'];
  expect(computeWinner(board)).toBe('O');
  expect(getWinningLine(board)).toEqual([0,4,8]);
});

test('detects draw', () => {
  const board = ['X','O','X','X','O','O','O','X','X'];
  expect(computeWinner(board)).toBe(null);
  expect(isDraw(board)).toBe(true);
});
