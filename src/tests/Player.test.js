import Player from '../Player.js';

describe('Player Module', () => {
  let player, computer;

  beforeEach(() => {
    player = new Player('Human', false);
    computer = new Player('CPU', true);
  });

  test('creates a player with their own gameboard', () => {
    expect(player.name).toBe('Human');
    expect(player.isComputer).toBe(false);
    expect(player.gameboard).toBeDefined();
  });

  test('player can attack opponent gameboard', () => {
    computer.gameboard.placeShip(2, [0, 0], false);
    const hit = player.attack(computer.gameboard, [0, 0]);

    expect(hit).toBe(true);
    expect(player.attacksMade.has('0,0')).toBe(true);
  });

  test('prevents duplicate attacks on the same coordinates', () => {
    player.attack(computer.gameboard, [1, 1]);
    const duplicateHit = player.attack(computer.gameboard, [1, 1]);

    expect(duplicateHit).toBe(false);
  });

  test('computer makes a valid random move and records it', () => {
    const coord = computer.computerAttack(player.gameboard);

    expect(coord).toHaveLength(2);
    expect(computer.attacksMade.has(`${coord[0]},${coord[1]}`)).toBe(true);
  });
});