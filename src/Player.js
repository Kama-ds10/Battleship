import Gameboard from './Gameboard.js';

export default class Player {
  constructor(name = 'Player', isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
    this.attacksMade = new Set(); // Keeps track of legal moves: "x,y"
  }

  attack(opponentBoard, [x, y]) {
    const key = `${x},${y}`;
    if (this.attacksMade.has(key)) return false; // Invalid move (already attacked)

    this.attacksMade.add(key);
    return opponentBoard.receiveAttack([x, y]);
  }

  getRandomCoordinate() {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.attacksMade.has(key));

    return [x, y];
  }

  computerAttack(opponentBoard) {
    if (!this.isComputer) return null;
    const coord = this.getRandomCoordinate();
    this.attack(opponentBoard, coord);
    return coord;
  }
}