import Ship from '../Ship.js';

describe('Ship Factory / Class', () => {
  test('creates a ship with correct length and zero initial hits', () => {
    const cruiser = new Ship(3);
    expect(cruiser.length).toBe(3);
    expect(cruiser.hits).toBe(0);
    expect(cruiser.isSunk()).toBe(false);
  });

  test('increments hits on hit()', () => {
    const submarine = new Ship(2);
    submarine.hit();
    expect(submarine.hits).toBe(1);
  });

  test('reports isSunk() as false when hits are less than length', () => {
    const battleship = new Ship(4);
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunk()).toBe(false);
  });

  test('reports isSunk() as true when hits equal length', () => {
    const destroyer = new Ship(2);
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toBe(true);
  });
});