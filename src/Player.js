import Gameboard from './Gameboard.js';

export default class Player {
  constructor(name = 'Player', isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
    this.attacksMade = new Set();
    this.potentialTargets = []; // Stores adjacent targets after a successful hit
  }

  attack(opponentBoard, [x, y]) {
    const key = `${x},${y}`;
    if (this.attacksMade.has(key)) return false;

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

    let target;

    // Use queued adjacent targets if available
    while (this.potentialTargets.length > 0) {
      const candidate = this.potentialTargets.shift();
      const key = `${candidate[0]},${candidate[1]}`;
      if (!this.attacksMade.has(key)) {
        target = candidate;
        break;
      }
    }

    if (!target) {
      target = this.getRandomCoordinate();
    }

    const isHit = this.attack(opponentBoard, target);

    // If hit, queue up adjacent orthagonal coordinates
    if (isHit) {
      const [x, y] = target;
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      neighbors.forEach(([nx, ny]) => {
        if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
          if (!this.attacksMade.has(`${nx},${ny}`)) {
            this.potentialTargets.push([nx, ny]);
          }
        }
      });
    }

    return target;
  }
}