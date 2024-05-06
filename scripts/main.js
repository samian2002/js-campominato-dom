const startGameButton = document.getElementById('startGame');
const gridContainer = document.getElementById('grid-container');
let isGridCreated = false;  // Flag per controllare se la griglia è già stata creata

startGameButton.addEventListener('click', function() {
    const gridSize = parseInt(document.getElementById('difficulty').value);
    const totalCells = gridSize * gridSize;

    if (!isGridCreated) {  // Controlla se la griglia non è stata ancora creata
        const bombs = generateBombs(totalCells);
        console.log('Bombe generate:', bombs);
        for (let i = 1; i <= totalCells; i++) {
            const cell = createCell(i, bombs);
            gridContainer.appendChild(cell);
        }
        isGridCreated = true;  // Imposta il flag a true dopo la creazione della griglia
    }
});

function generateBombs(gridSize, bombCount = 16) {
    const bombs = new Set();
    while (bombs.size < bombCount) {
        const bombPosition = Math.floor(Math.random() * gridSize) + 1;
        bombs.add(bombPosition);
    }
    return Array.from(bombs);
}

function createCell(id, bombs) {
    const cell = document.createElement('div');
    cell.className = 'grid-item';
    cell.id = 'cell' + id;
    cell.addEventListener('click', function() {
        if (this.innerHTML === '') {
            const cellId = parseInt(this.id.replace('cell', ''));
            if (bombs.includes(cellId)) {
                this.style.backgroundColor = 'red'; // Bomba cliccata
                gameOver(); // Fine del gioco
            } else {
                this.innerHTML = id;
                this.style.backgroundColor = 'lightblue'; // Cellla vuota
                updateScore(); // Aggiorna il punteggio
            }
        }
    });
    return cell;
}

let score = 0; // Inizializza il punteggio a 0

function updateScore() {
    score++; // Incrementa il punteggio
    console.log('Punteggio:', score);
}

function gameOver() {
    alert('Hai perso!'); // Avviso per l'utente
    // Blocca tutti i clic sulle celle
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}
