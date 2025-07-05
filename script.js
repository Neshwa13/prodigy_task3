const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  });
});

restartBtn.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = '');
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      statusText.textContent = `Player ${board[a]} Wins! ??`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}
