document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('gameBoard');
    initializeGame(gameBoard);
  });
  
  function initializeGame(board) {
    const cols = 7, rows = 6;
    let currentPlayer = 'player1'; // Alternates between 'player1' and 'player2'
    board.innerHTML = ''; // Clear previous board
  
    // Generate board with cells
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.column = c;
        cell.dataset.row = r;
        board.appendChild(cell);
      }
    }
  
    // Handle clicks on board to drop discs
    board.addEventListener('click', function(event) {
      const col = event.target.dataset.column;
      if (col !== undefined) {
        dropDisc(col, currentPlayer, board, rows, cols);
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      }
    });
  }
  
  function dropDisc(col, player, board, rows, cols) {
    for (let row = rows - 1; row >= 0; row--) {
      const index = row * cols + parseInt(col);
      const cell = board.children[index];
      if (!cell.classList.contains('player1') && !cell.classList.contains('player2')) {
        // Simulate disc dropping
        const disc = document.createElement('div');
        disc.className = `disc ${player}`;
        cell.appendChild(disc);
        setTimeout(() => disc.style.top = '0%', 0); // Start the animation
  
        // Update the cell class after the animation to reflect the disc has landed
        setTimeout(() => cell.classList.add(player), 500);
        break; // Exit loop after placing the disc
      }
    }
  }
  
  
  // Simplified win check for horizontal, vertical, and diagonal
function checkWinner(board, cols, rows, player) {
    // Check horizontal
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 3; c++) {
        if (board[c][r] === player && board[c+1][r] === player && board[c+2][r] === player && board[c+3][r] === player) {
          return true;
        }
      }
    }
  
    // Check vertical
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows - 3; r++) {
        if (board[c][r] === player && board[c][r+1] === player && board[c][r+2] === player && board[c][r+3] === player) {
          return true;
        }
      }
    }
  
    // Check diagonal (down-right)
    for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < cols - 3; c++) {
        if (board[c][r] === player && board[c+1][r+1] === player && board[c+2][r+2] === player && board[c+3][r+3] === player) {
          return true;
        }
      }
    }
  
    // Check diagonal (up-right)
    for (let r = 3; r < rows; r++) {
      for (let c = 0; c < cols - 3; c++) {
        if (board[c][r] === player && board[c+1][r-1] === player && board[c+2][r-2] === player && board[c+3][r-3] === player) {
          return true;
        }
      }
    }
  
    return false; // No win found
  }
  
  