/*----- constants -----*/
const LOOKUP = {
  1: {
    icon: "X",
    color: "#6F61C0",
  },
  "-1": {
    icon: "O",
    color: "#D5FFE4",
  },
  0: {
    icon: "?",
    color: "#969696",
  },
  T: {
    icon: "🐱",
    color: "Orange",
  },
};

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- state variables -----*/
let board;
let turn;
let winner;
let score;

/*----- cached elements  -----*/
const msgEl = document.querySelector("h1");
const resetBtn = document.querySelector("button");
const cellEls = [...document.querySelectorAll("#board > div")];
const scoreEls = [...document.querySelectorAll("#scores > h3")];

/*----- event listeners -----*/
resetBtn.addEventListener("click", init);
document.getElementById("board").addEventListener("click", cellClickHandler);

/*----- functions -----*/
init();

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turn = 1;
  winner = 0;

  score = scoreHandler();
  render();
}

function scoreHandler() {
  return score ? scoreIncrease(winner) : [0, 0];
}

function scoreIncrease(winningPlayer) {
  if (winningPlayer === 1) {
    score[0]++;
  } else if (winningPlayer === -1) {
    score[1]++;
  }
  return score;
}

function cellClickHandler(e) {
  if (e.target.innerText !== "?") return;
  const elIdx = cellEls.indexOf(e.target);
  if (elIdx === -1) return;
  board[elIdx] = turn;
  turn *= -1;
  winner = getWinner();

  score = scoreHandler();
  render();
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
  renderScores();
}

function getWinner() {
  return checkWinStatus() || checkTie();
}

function checkWinStatus() {
  for (let combo of WINNING_COMBOS) {
    const total = board[combo[0]] + board[combo[1]] + board[combo[2]];
    const absTotal = Math.abs(total);

    if (absTotal === 3) {
      return board[combo[0]];
    }
  }
}

function checkTie() {
  if (board.includes(0)) return 0;
  return "T";
}

function renderBoard() {
  board.forEach(function (val, idx) {
    const newVal = winner ? winner : val;
    const el = document.getElementById(`${idx}`);
    el.style.backgroundColor = LOOKUP[newVal].color;
    el.innerText = `${LOOKUP[newVal].icon}`;
  });
}

function renderControls() {
  resetBtn.style.visibility = winner ? "visible" : "hidden";
}

function renderMessage() {
  if (winner === "T") {
    msgEl.innerHTML = `<span style="color:${LOOKUP[winner].color};">CATS GAME</span>`;
  } else if (winner) {
    msgEl.innerHTML = `<span style="color:${LOOKUP[winner].color};">${LOOKUP[winner].icon}</span> WINS!`;
  } else {
    msgEl.innerHTML = `<span style="color:${LOOKUP[turn].color};">${LOOKUP[turn].icon}'s</span> TURN!`;
  }
}

function renderScores() {
  scoreEls.forEach(function (el, elIdx) {
    el.innerHTML = `<span style="color:${LOOKUP[el.id].color};">${
      score[elIdx]
    }</span>`;
  });
}
