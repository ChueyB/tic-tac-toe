/*----- constants -----*/
const PLAYERS = {
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

/*----- cached elements  -----*/
const msgEl = document.querySelector("h1");
const resetBtn = document.querySelector("button");
const cellEls = [...document.querySelectorAll("#board > div")];

/*----- event listeners -----*/
resetBtn.addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turn = 1;
  winner = 0;

  clickToggle();
  render();
}

function cellClickHandler(e) {
  if (e.target.innerText !== "?") return;
  const elIdx = cellEls.indexOf(e.target);
  if (elIdx === -1) return;
  board[elIdx] = turn;

  turn *= -1;

  winner = getWinner();

  clickToggle();
  render();
}

function clickToggle() {
  if (winner) {
    document
      .getElementById("board")
      .removeEventListener("click", cellClickHandler);
  } else {
    document
      .getElementById("board")
      .addEventListener("click", cellClickHandler);
  }
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
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
  if (winner === "T") return fillWithCats();
  board.forEach(function (val, idx) {
    const el = document.getElementById(`${idx}`);
    el.style.backgroundColor = PLAYERS[val].color;
    el.innerText = `${PLAYERS[val].icon}`;
  });
}

function renderControls() {
  resetBtn.style.visibility = winner ? "visible" : "hidden";
}

function renderMessage() {
  if (winner === "T") {
    msgEl.innerHTML = `<span style="color:${PLAYERS[winner].color};">CATS GAME</span>`;
  } else if (winner) {
    msgEl.innerHTML = `<span style="color:${PLAYERS[winner].color};">${PLAYERS[winner].icon}</span> WINS!`;
  } else {
    msgEl.innerHTML = `<span style="color:${PLAYERS[turn].color};">${PLAYERS[turn].icon}'s</span> TURN!`;
  }
}

function fillWithCats() {
  board.forEach(function (val, idx) {
    const el = document.getElementById(`${idx}`);
    el.style.backgroundColor = PLAYERS[winner].color;
    el.innerText = `${PLAYERS[winner].icon}`;
  });
}
