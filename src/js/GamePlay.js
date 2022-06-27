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
  }

  init() {
    this.drawField();
    this.boardEl.addEventListener("click", (event) => this.onCellClick(event));
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
    this.interval = null;
    this.pointsGoblin = 0;
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
    const { target } = event;
    const cellClick = target.closest(".cell");
    if (this.cells.indexOf(cellClick) !== this.indexGoblin) {
      this.pointsGoblin++;
    }
    if (this.pointsGoblin === 5) {
      clearInterval(this.interval);
      this.boardEl.innerHTML = "";
      this.drawField();
      alert("Game over");
    }
  }
}
