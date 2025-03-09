const board = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

// Handle cell click
const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkForWinner();
};

// Check for a winner or draw
const checkForWinner = () => {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] === "" ||
      gameState[b] === "" ||
      gameState[c] === ""
    ) {
      continue;
    }
    if (
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `It's ${currentPlayer}'s turn`;
};

// Reset the game
const resetGame = () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
};

// Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Initialize game status
statusText.textContent = `It's ${currentPlayer}'s turn`;