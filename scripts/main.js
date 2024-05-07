document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const grid = document.getElementById('grid');
    const difficultySelect = document.getElementById('difficulty');
    let bombList = [];
    let score = 0;
    let gameActive = false;
    let cellsClicked = 0;

    startButton.addEventListener('click', () => {
        startGame();
    });

    function generateGrid(size) {
        grid.innerHTML = '';
        const totalCells = size * size;
        for (let i = 1; i <= totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            cell.addEventListener('click', () => cellClicked(cell, size));
            grid.appendChild(cell);
        }
    }

    function generateBombs(size) {
        const totalCells = size * size;
        bombList = [];
        while (bombList.length < 16) {
            const bomb = Math.floor(Math.random() * totalCells) + 1;
            if (!bombList.includes(bomb)) {
                bombList.push(bomb);
            }
        }
    }

    function cellClicked(cell, size) {
        if (!gameActive) return;
        const cellId = parseInt(cell.id);
        if (bombList.includes(cellId)) {
            cell.style.backgroundColor = 'red';
            alert(`Game Over! Your score was: ${score}`);
            gameActive = false;
        } else {
            cell.style.backgroundColor = 'blue';
            score++;
            cellsClicked++;
            console.log(`Score: ${score}`);
        }
        if (cellsClicked === size * size - bombList.length) {
            alert('Congratulations! You won the game!');
            gameActive = false;
        }
    }

    function startGame() {
        score = 0;
        cellsClicked = 0;
        gameActive = true;
        const size = parseInt(difficultySelect.value);
        generateGrid(size);
        generateBombs(size);
    }
});
