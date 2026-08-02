const game = document.getElementById("game");
const status = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let gameOver = false;

// ساختن خانه‌های بازی
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  cell.onclick = () => play(i);
  game.appendChild(cell);
}

function play(i) {
  if (gameOver) return;
  if (board[i] !== "") return;

  board[i] = turn;
  updateBoard();

  if (checkWin(turn)) {
    status.textContent = "برنده: " + turn;
    gameOver = true;
    return;
  }

  if (board.every(c => c !== "")) {
    status.textContent = "مساوی شد!";
    gameOver = true;
    return;
  }

  turn = turn === "X" ? "O" : "X";
  status.textContent = "نوبت: " + turn;
}

function updateBoard() {
  document.querySelectorAll(".cell").forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

function checkWin(p) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // ردیف‌ها
    [0,3,6], [1,4,7], [2,5,8], // ستون‌ها
    [0,4,8], [2,4,6]           // قطرها
  ];
  return wins.some(w => w.every(i => board[i] === p));
                                             }
