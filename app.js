let inputDir = {
  x: 0,
  y: 0,
};
// music
// let foodSound = new Audio();
// let gameOverSound = new Audio('');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let batArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let lastScoreCheck = 0;

// function
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if (score >= lastScoreCheck + 10) {
    speed += 1;
    lastScoreCheck = score;
  }
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(bat) {
  for (let i = 1; i < batArr.length; i++) {
    if (bat[i].x === bat[0].x && bat[i].y === bat[0].y) {
      return true;
    }
  }
  if (bat[0].x >= 18 || (bat[0].x <= 0 && bat[0].y >= 18) || bat[0].y <= 0) {
    return true;
  }
}

function gameEngine() {
  // part 1: updating the snake array & food;
  if (isCollide(batArr)) {
    inputDir = { x: 0, y: 0 };
    alert("GAME OVER!");
    batArr = [{ x: 13, y: 15 }];
    score = 0;
    scorebox.innerHTML = "Score: 0";
  }
  if (batArr[0].y === food.y && batArr[0].x === food.x) {
    batArr.unshift({
      x: batArr[0].x + inputDir.x,
      y: batArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    score += 1;
    scorebox.innerHTML = "Score:" + score;
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()),
      y: 2 + Math.round(a + (b - a) * Math.random()),
    }; // to generate random no
  }
  // moving
  for (let i = batArr.length - 2; i >= 0; i--) {
    batArr[i + 1] = { ...batArr[i] };
  }
  batArr[0].x += inputDir.x;
  batArr[0].y += inputDir.y;

  // part 2: display the batman and food;
  board.innerHTML = "";
  // Displaying the bat
  batArr.forEach((e, i) => {
    let batElement = document.createElement("div");
    batElement.style.gridRowStart = e.y;
    batElement.style.gridColumnStart = e.x;
    if (i === 0) {
      batElement.classList.add("batmanHead");
    } else {
      batElement.classList.add("batHead");
    }
    board.appendChild(batElement);
  });

  // Display food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// logic
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 };
  // movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir = { x: 1, y: 0 };
      break;
    default:
      break;
  }
});
