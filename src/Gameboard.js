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

  placeRandomShips() {
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        const isVertical = Math.random() < 0.5;
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        // Check bound limits
        if (!isVertical && x + length > 10) continue;
        if (isVertical && y + length > 10) continue;

        // Check overlap with existing ships
        const newCoords = [];
        for (let i = 0; i < length; i++) {
          newCoords.push(isVertical ? [x, y + i] : [x + i, y]);
        }

        const overlap = this.placedShips.some((item) =>
          item.coordinates.some(([sx, sy]) =>
            newCoords.some(([nx, ny]) => nx === sx && ny === sy)
          )
        );

        if (!overlap) {
          this.placeShip(length, [x, y], isVertical);
          placed = true;
        }
      }
    });
  }
}