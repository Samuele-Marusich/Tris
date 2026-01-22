// Array che rappresenta la board (9 celle)
let board = ["", "", "", "", "", "", "", "", ""];

// Giocatore corrente
let currentPlayer = "X";

// Indica se il gioco è attivo
let gameActive = true;

// Elementi HTML
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Combinazioni vincenti (indici della board)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Gestione del click su una cella
function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    // Se la cella è già occupata o il gioco è finito, non fare nulla
    if (board[index] !== "" || !gameActive) {
        return;
    }

    // Aggiorna board e grafica
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Controlla se qualcuno ha vinto
    if (checkWin()) {
        statusText.textContent = "Ha vinto il giocatore " + currentPlayer;
        gameActive = false;
        return;
    }

    // Controlla pareggio
    if (board.includes("") === false) {
        statusText.textContent = "Pareggio!";
        gameActive = false;
        return;
    }

    // Cambia giocatore
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Turno del giocatore " + currentPlayer;
}

// Controllo vittoria
function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }
    return false;
}

// Reset del gioco
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Turno del giocatore X";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

// Event listener
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);
