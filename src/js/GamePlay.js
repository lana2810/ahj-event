import imgsrc from "../img/goblin.png";
import getRandom from "./utils";

export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.boardEl = document.getElementById("board");
    this.cells = [];
    this.interval = null;
    this.indexGoblin = null;
    this.pointsGoblin = 0;
    this.pointsPlayer = 0;
  }

  init() {
    this.drawField();
    document
      .querySelector(".btn")
      .addEventListener("click", (event) => this.onNewGameClick(event));
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGame();
  }

  drawField() {
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      this.boardEl.append(cellEl);
      this.cells.push(cellEl);
    }
  }

  newGame() {
    this.boardEl.addEventListener("click", this.onCellClick.bind(this));
    this.interval = null;
    this.pointsGoblin = 0;
    this.pointsPlayer = 0;
    const goblin = document.createElement("img");
    goblin.src = imgsrc;
    goblin.classList.add("character");
    this.interval = setInterval(() => {
      this.indexGoblin = getRandom(0, this.cells.length - 1);
      this.cells[this.indexGoblin].append(goblin);
    }, 1000);
  }

  onCellClick(event) {
    event.preventDefault();
    const pointsPlayerEl = document.getElementById("pointsPlayer");
    const pointsGoblinEl = document.getElementById("pointsGoblin");
    const { target } = event;
    const cellClick = target.closest(".cell");
    if (this.cells.indexOf(cellClick) === this.indexGoblin) {
      this.pointsPlayer++;
      pointsPlayerEl.textContent = `Игрок - ${this.pointsPlayer}`;
    } else {
      this.pointsGoblin++;
      pointsGoblinEl.textContent = `Гоблин - ${this.pointsGoblin}`;
    }
    if (this.pointsGoblin === 5) {
      pointsPlayerEl.textContent = "";
      pointsGoblinEl.textContent = "";
      this.gameOver();
    }
  }

  gameOver() {
    this.boardEl.removeEventListener("click", this.onCellClick);
    setTimeout(() => {
      clearInterval(this.interval);
      alert("Game over");
      this.boardEl.innerHTML = "";
      this.drawField();
    }, 100);
  }
}
