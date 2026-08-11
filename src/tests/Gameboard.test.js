import Gameboard from '../Gameboard.js';

describe('Gameboard Factory / Class', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test('places ship at specific coordinates horizontally', () => {
    board.placeShip(3, [0, 0], false);
    expect(board.placedShips.length).toBe(1);
    expect(board.placedShips[0].coordinates).toEqual([[0, 0], [1, 0], [2, 0]]);
  });

  test('places ship at specific coordinates vertically', () => {
    board.placeShip(2, [1, 2], true);
    expect(board.placedShips[0].coordinates).toEqual([[1, 2], [1, 3]]);
  });

  test('receiveAttack hits a ship and increments its hit count', () => {
    const ship = board.placeShip(2, [0, 0], false);
    const result = board.receiveAttack([0, 0]);

    expect(result).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack records missed attacks when no ship is hit', () => {
    board.placeShip(2, [0, 0], false);
    const result = board.receiveAttack([5, 5]);

    expect(result).toBe(false);
    expect(board.missedAttacks).toEqual([[5, 5]]);
  });

  test('reports correctly when not all ships are sunk', () => {
    board.placeShip(1, [0, 0], false);
    board.placeShip(1, [5, 5], false);

    board.receiveAttack([0, 0]);
    expect(board.allSunk()).toBe(false);
  });

  test('reports true when all ships have been sunk', () => {
    board.placeShip(1, [0, 0], false);
    board.placeShip(1, [5, 5], false);

    board.receiveAttack([0, 0]);
    board.receiveAttack([5, 5]);
    expect(board.allSunk()).toBe(true);
  });
});