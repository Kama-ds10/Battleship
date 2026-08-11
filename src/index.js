import Player from './Player.js';
import initGame from './domController.js';

const player = new Player('Human', false);
const computer = new Player('Computer', true);

// Predetermined placements for testing initial game loop
player.gameboard.placeShip(5, [0, 0], false);
player.gameboard.placeShip(4, [2, 3], true);
player.gameboard.placeShip(3, [5, 5], false);

computer.gameboard.placeShip(5, [1, 1], true);
computer.gameboard.placeShip(4, [4, 0], false);
computer.gameboard.placeShip(3, [6, 6], true);

document.addEventListener('DOMContentLoaded', () => {
  initGame(player, computer);
});