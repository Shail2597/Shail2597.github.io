// Minesweeper
// Shail Chaudhari
// March 28, 2025

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize;
const SQUARE_DIMENSIONS = 7;
let topGrid, mineGrid;
const OPEN_TILE = 0;
const CLOSED_TILE = 1;
const MINE_TILE = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Make the largest square that fits
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  } else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
  resetGame();
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    resetGame();
  }
}

function displayGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (topGrid[y][x] === CLOSED_TILE) {
        stroke(255);
        fill("black");
      } else if (topGrid[y][x] === OPEN_TILE) {
        stroke(0);
        fill("white");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(CLOSED_TILE);
    }
  }
  return newGrid;
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE); // Initialize all cells as OPEN_TILE
      if (random(100) < 20) { // Adjust the probability for mine placement
        newGrid[y][x] = MINE_TILE; // Place a mine
      }
    }
  }
  return newGrid;
}

function mousePressed() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (mouseX > x * cellSize && mouseX < x * cellSize + cellSize && mouseY > y * cellSize && mouseY < y * cellSize + cellSize) {
        if (topGrid[y][x] === CLOSED_TILE) {
          if (mineGrid[y][x] === MINE_TILE) {
            // Game over logic
            console.log("Game Over! You clicked on a mine.");
            // Optionally, reveal all mines or stop the game
          } else {
            topGrid[y][x] = OPEN_TILE;
            // Optionally, calculate and display adjacent mines here
          }
        }
      }
    }
  }
}

function resetGame() {
  topGrid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  mineGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}
