import Player from './Player.js';
import initGame from './domController.js';

function setupNewGame() {
  const player = new Player('Human', false);
  const computer = new Player('Computer', true);

  // Randomize placement for both players
  player.gameboard.placeRandomShips();
  computer.gameboard.placeRandomShips();

  initGame(player, computer);
}

document.addEventListener('DOMContentLoaded', () => {
  setupNewGame();

  const randomizeBtn = document.querySelector('#randomize-btn');
  if (randomizeBtn) {
    randomizeBtn.addEventListener('click', () => {
      setupNewGame();
    });
  }
});