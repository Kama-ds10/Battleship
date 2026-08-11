import Ship from './Ship.js';

export default class Gameboard {
  constructor() {
    this.gridSize = 10;
    this.placedShips = []; // Stores { ship, coordinates: [[x, y], ...] }
    this.missedAttacks = []; // Stores [[x, y], ...]
  }

  placeShip(length, startCoord, isVertical = false) {
    const ship = new Ship(length);
    const coordinates = [];
    const [startX, startY] = startCoord;

    for (let i = 0; i < length; i++) {
      const x = isVertical ? startX : startX + i;
      const y = isVertical ? startY + i : startY;
      coordinates.push([x, y]);
    }

    this.placedShips.push({ ship, coordinates });
    return ship;
  }

  receiveAttack([x, y]) {
    for (const item of this.placedShips) {
      const hitFound = item.coordinates.some(
        ([shipX, shipY]) => shipX === x && shipY === y
      );

      if (hitFound) {
        item.ship.hit();
        return true;
      }
    }

    this.missedAttacks.push([x, y]);
    return false;
  }

  allSunk() {
    return this.placedShips.length > 0 && this.placedShips.every((item) => item.ship.isSunk());
  }
}