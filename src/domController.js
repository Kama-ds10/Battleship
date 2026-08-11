export default function initGame(player, computer) {
  const playerBoardEl = document.querySelector('#player-board');
  const computerBoardEl = document.querySelector('#computer-board');
  const statusMessageEl = document.querySelector('#status-message');

  let gameOver = false;

  function renderBoards() {
    renderBoard(playerBoardEl, player.gameboard, false);
    renderBoard(computerBoardEl, computer.gameboard, true);
  }

  function renderBoard(boardElement, gameboard, isEnemy = false) {
    boardElement.innerHTML = '';

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;

        // Check if coordinate has a placed ship
        const hasShip = gameboard.placedShips.some((item) =>
          item.coordinates.some(([sx, sy]) => sx === x && sy === y)
        );

        // Check hits and misses
        const isHit = hasShip && playerAttackedCoord(gameboard, [x, y]);
        const isMiss = gameboard.missedAttacks.some(([mx, my]) => mx === x && my === y);

        if (!isEnemy && hasShip) cell.classList.add('ship');
        if (isHit) cell.classList.add('hit');
        if (isMiss) cell.classList.add('miss');

        if (isEnemy && !gameOver) {
          cell.addEventListener('click', () => handleCellClick(x, y));
        }

        boardElement.appendChild(cell);
      }
    }
  }

  function playerAttackedCoord(gameboard, [x, y]) {
    return gameboard.placedShips.some((item) =>
      item.coordinates.some(([sx, sy]) => sx === x && sy === y) &&
      item.ship.hits > 0 &&
      gameboard.missedAttacks.every(([mx, my]) => mx !== x || my !== y)
    );
  }

  function handleCellClick(x, y) {
    if (gameOver) return;

    // Human attacks computer board
    const validAttack = player.attack(computer.gameboard, [x, y]);
    if (!validAttack) return; // Ignore if cell was already attacked

    if (computer.gameboard.allSunk()) {
      gameOver = true;
      statusMessageEl.textContent = '🎉 You Win! All enemy ships sunk!';
      renderBoards();
      return;
    }

    // Computer turn
    statusMessageEl.textContent = 'Computer is thinking...';
    setTimeout(() => {
      computer.computerAttack(player.gameboard);

      if (player.gameboard.allSunk()) {
        gameOver = true;
        statusMessageEl.textContent = '💥 Game Over! Computer sunk your fleet!';
      } else {
        statusMessageEl.textContent = 'Your turn! Select a coordinate on the enemy board.';
      }
      renderBoards();
    }, 400);

    renderBoards();
  }

  // Initial render
  statusMessageEl.textContent = 'Game started! Click on enemy waters to fire.';
  renderBoards();
}