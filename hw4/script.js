const boardSize = 12;
const mineCount = 20;
let board = [];
let gameOver = false;
let selectedCell = { row: 0, col: 0 };

function initBoard() {
    board = Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => ({
        mine: false,
        open: false,
        flag: false,
        adjacentMines: 0,
    })));

    document.getElementById('game-board').innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => openCell(row, col));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(row, col);
            });
            document.getElementById('game-board').appendChild(cell);
        }
    }
    placeMines();
    updateAdjacentCounts();
    updateSelectedCell();
}

function placeMines() {
    let placedMines = 0;
    while (placedMines < mineCount) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (!board[row][col].mine) {
            board[row][col].mine = true;
            placedMines++;
        }
    }
}

function updateAdjacentCounts() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (!board[row][col].mine) {
                board[row][col].adjacentMines = countAdjacentMines(row, col);
            }
        }
    }
}

function countAdjacentMines(row, col) {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const nr = row + r;
            const nc = col + c;
            if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize && board[nr][nc].mine) {
                count++;
            }
        }
    }
    return count;
}

function openCell(row, col) {
    if (gameOver || board[row][col].open || board[row][col].flag) return;

    board[row][col].open = true;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add('open');

    if (board[row][col].mine) {
        cell.classList.add('mine');
        cell.textContent = '💣';
        gameOver = true;
        alert('Вы проиграли!');
        return;
    }

    if (board[row][col].adjacentMines > 0) {
        cell.textContent = board[row][col].adjacentMines;
    } else {
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                const nr = row + r;
                const nc = col + c;
                if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
                    openCell(nr, nc);
                }
            }
        }
    }

    checkWin();
}

function toggleFlag(row, col) {
    if (gameOver || board[row][col].open) return;

    board[row][col].flag = !board[row][col].flag;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.classList.toggle('flag');
    cell.textContent = board[row][col].flag ? '🚩' : '';
}

function checkWin() {
    let openedCells = 0;
    let flaggedMines = 0;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col].open) openedCells++;
            if (board[row][col].flag && board[row][col].mine) flaggedMines++;
        }
    }

    if (openedCells + mineCount === boardSize * boardSize || flaggedMines === mineCount) {
        gameOver = true;
        alert('Вы выиграли!');
    }
}

function updateSelectedCell() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
    const cell = document.querySelector(`[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`);
    if (cell) cell.classList.add('selected');
}

function moveCursor(rowDelta, colDelta) {
    selectedCell.row = (selectedCell.row + rowDelta + boardSize) % boardSize;
    selectedCell.col = (selectedCell.col + colDelta + boardSize) % boardSize;
    updateSelectedCell();
}

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === ' ' || e.key === 'Enter')) {
        toggleFlag(selectedCell.row, selectedCell.col);
    } else {
        switch (e.key) {
            case 'ArrowUp':
                moveCursor(-1, 0);
                break;
            case 'ArrowDown':
                moveCursor(1, 0);
                break;
            case 'ArrowLeft':
                moveCursor(0, -1);
                break;
            case 'ArrowRight':
                moveCursor(0, 1);
                break;
            case 'Enter':
                openCell(selectedCell.row, selectedCell.col);
                break;
            case ' ':
                openCell(selectedCell.row, selectedCell.col);
                break;
        }
    }
});

initBoard();