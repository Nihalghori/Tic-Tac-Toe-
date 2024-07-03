document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('.status');
    const restartButton = document.getElementById('restart');
    const startGameButton = document.getElementById('startGame');
    const playerXInput = document.getElementById('playerXName');
    const playerOInput = document.getElementById('playerOName');

    let currentPlayer = 'X';
    let gameActive = true;
    let playerXName = 'Player X';
    let playerOName = 'Player O';
    const gameState = ["", "", "", "", "", "", "", "", ""];
    const winningConditions  = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
          


        if (checkWin()) {
            statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} has won!`;
            gameActive = false;
        } else if (gameState.includes("")) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
        } else {
            statusText.textContent = `It's a draw!`;
            gameActive = false;
        }
    };
      
    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill("");
        cells.forEach(cell => cell.textContent = "");
        statusText.textContent = `${playerXName}'s turn`;
    };

    const handleStartGame = () => {
        playerXName = playerXInput.value || 'Player X';
        playerOName = playerOInput.value || 'Player O';
        handleRestartGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    startGameButton.addEventListener('click', handleStartGame);
});