let matrix = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let boxes = Array.from(document.querySelectorAll(".box"));
const moveMusic = document.getElementById("move");
const gameDrawMusic = document.getElementById("gameDraw");
const winMusic = document.getElementById("win");
const popup = document.querySelector(".popup");

function gameEngine() {
  let player = Math.round(Math.random()) == 1 ? "x" : "o";
  boxes.forEach((box, index) => {
    function handleClick() {
      let row = Math.floor(index / 3);
      let col = index % 3;

      if (player == "x") {
        matrix[row].splice(col, 1, "x");
        box.innerText = player.toUpperCase();
        box.classList.add("x");
        checkWin();
      } else if (player == "o") {
        box.innerText = player.toUpperCase();
        box.classList.add("o");
        matrix[row].splice(col, 1, "o");
        checkWin();
      }
      player = player == "x" ? "o" : "x";
      moveMusic.play();
      box.removeEventListener("click", handleClick);
    }
    box.addEventListener("click", handleClick);
    box.addEventListener("touch", handleClick);
  });
}

function checkWin() {
  let msg = "";
  if (
    (matrix[0][0] == "x" && matrix[0][1] == "x" && matrix[0][2] == "x") ||
    (matrix[1][0] == "x" && matrix[1][1] == "x" && matrix[1][2] == "x") ||
    (matrix[2][0] == "x" && matrix[2][1] == "x" && matrix[2][2] == "x") ||
    (matrix[0][0] == "x" && matrix[1][0] == "x" && matrix[2][0] == "x") ||
    (matrix[0][1] == "x" && matrix[1][1] == "x" && matrix[2][1] == "x") ||
    (matrix[0][2] == "x" && matrix[1][2] == "x" && matrix[2][2] == "x") ||
    (matrix[0][0] == "x" && matrix[1][1] == "x" && matrix[2][2] == "x") ||
    (matrix[0][2] == "x" && matrix[1][1] == "x" && matrix[2][0] == "x")
  ) {
    msg = "X won this game.";
    gameReset(msg);
    winMusic.play();
  } else if (
    (matrix[0][0] == "o" && matrix[0][1] == "o" && matrix[0][2] == "o") ||
    (matrix[1][0] == "o" && matrix[1][1] == "o" && matrix[1][2] == "o") ||
    (matrix[2][0] == "o" && matrix[2][1] == "o" && matrix[2][2] == "o") ||
    (matrix[0][0] == "o" && matrix[1][0] == "o" && matrix[2][0] == "o") ||
    (matrix[0][1] == "o" && matrix[1][1] == "o" && matrix[2][1] == "o") ||
    (matrix[0][2] == "o" && matrix[1][2] == "o" && matrix[2][2] == "o") ||
    (matrix[0][0] == "o" && matrix[1][1] == "o" && matrix[2][2] == "o") ||
    (matrix[0][2] == "o" && matrix[1][1] == "o" && matrix[2][0] == "o")
  ) {
    msg = "O won this game.";
    gameReset(msg);
    winMusic.play();
  } else if (
    matrix[0][0] != "" &&
    matrix[0][1] != "" &&
    matrix[0][2] != "" &&
    matrix[1][0] != "" &&
    matrix[1][1] != "" &&
    matrix[1][2] != "" &&
    matrix[2][0] != "" &&
    matrix[2][1] != "" &&
    matrix[2][2] != ""
  ) {
    msg = "It's draw :(";
    gameReset(msg);
    gameDrawMusic.play();
  }
}

function gameReset(msg) {
  const resetButton = document.getElementById("resetGame");
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
  popup.style.transform = "translate(-50%,-50%) scale(1.5)";
  document.getElementById("info").innerText = msg;
  resetButton.addEventListener("click", function resetClick() {
    boxes.forEach((box) => {
      box.innerText = "";
    });
    matrix = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    popup.style.transform = "translate(-50%,-50%) scale(1)";
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
    gameEngine();
    resetButton.removeEventListener("click", resetClick);
  });
}

gameEngine();
