let turn = 0;
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

let allCell = Array(9).fill(0);
let isAllSelected = false;
let round = 1;
let falcon = 0;
let draw = 0;
let worrior = 0;
let gameOver = false;

let winSound = new Audio("victory.mp3");
let drawSound = new Audio("draw.mp3");

let btn = document.querySelector('.playAgain'); 
let turnOf = document.querySelector('.turns');

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener("click", () => handleClick(parseInt(cell.id)));
    });

    btn.addEventListener("click", resetGame);
});

updateUI(); 

function resetGame() {
    if (!gameOver) return;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.style.removeProperty("background-color");
        cell.style.color = "#0ff"; // Reset text color
        cell.style.border = "1px solid #0ff"; // Reset border
        cell.style.textShadow = "0 0 5px #0ff, 0 0 10px #00ffff, 0 0 20px #00ffff"; // Reset neon effect
    });

    allCell.fill(0);
    isAllSelected = false;
    gameOver = false;
    round++;

    document.getElementById('result').innerHTML = "";
    updateUI();
}


function handleClick(id) {
    if (gameOver) return;

    let cellHtml = document.getElementById(id);
    if (!cellHtml || cellHtml.innerHTML !== "") return;

    cellHtml.innerHTML = turn === 0 ? "X" : "O";
    allCell[id] = turn === 0 ? "X" : "O";
    turn = turn === 0 ? 1 : 0;

    isAllSelected = allCell.every(cell => cell !== 0);
    let winner = checkWinner();

    if (winner) {
        gameOver = true;
        winSound.play();
        if (winner === "X") {
            falcon++;
            document.getElementById('result').innerHTML = "Falcon Win!";
        } else {
            worrior++;
            document.getElementById('result').innerHTML = "Warrior Win!";
        }
    } else if (isAllSelected) {
        gameOver = true;
        drawSound.play();
        draw++;
        document.getElementById('result').innerHTML = "Match Draw!!";
    }

    updateUI();
}

function checkWinner() {
    for (let comb of winCombinations) {
        let [a, b, c] = comb.map(i => document.getElementById(i).innerHTML);
        if (a !== "" && a === b && b === c) {
            let glowColor = a === "X" ? "#00c3ff" : "#ff3131"; // Falco (Blue) | Worrior (Red)
            
            comb.forEach(index => {
                let cell = document.getElementById(index);
                cell.style.backgroundColor = "black"; // Set a dark background
                cell.style.color = glowColor; // Change text color to match neon theme
                cell.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 40px ${glowColor}`;
            });
            return a;
        }
    }
    return null;
}


function updateUI() {
    turn != 0 ? turnOf.innerHTML = "Worrior's Turn" : turnOf.innerHTML = "Falco's Turn";
    document.querySelector('.round').innerHTML = "Round " + round;
    document.querySelector('.falcoWin').innerHTML = falcon;
    document.querySelector('.draw').innerHTML = draw;
    document.querySelector('.worrWin').innerHTML = worrior;
}
