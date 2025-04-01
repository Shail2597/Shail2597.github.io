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
const FLAGGED_TILE = 2; 
const MINE_TILE = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);

  document.addEventListener("contextmenu", event => event.preventDefault()); // Prevent default context menu on right-click
  // Make the largest square that fits
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  } 
  else {
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
      }
      else if (topGrid[y][x] === OPEN_TILE) {
        stroke(0);
        fill("white");
      }
      else if (topGrid[y][x] === FLAGGED_TILE) {
        stroke(255, 0, 0);
        fill("yellow");
      }
      else if (topGrid[y][x] === MINE_TILE) {
        stroke(255, 0, 0);
        fill("red");
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
  if (mouseButton === LEFT) {
    for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
      for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
        if (mouseX > x * cellSize && mouseX < x * cellSize + cellSize && mouseY > y * cellSize && mouseY < y * cellSize + cellSize) {
          if (topGrid[y][x] === CLOSED_TILE) {
            if (mineGrid[y][x] === MINE_TILE) {
              topGrid[y][x] = MINE_TILE; // Reveal the mine
              console.log("Game Over! You clicked on a mine.");
            }
            else {
              topGrid[y][x] = OPEN_TILE;
              // Optionally, calculate and display adjacent mines here
            }
          }
        }
      }
    }
  }
  else if (mouseButton === RIGHT) {
    for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
      for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
        if (mouseX > x * cellSize && mouseX < x * cellSize + cellSize && mouseY > y * cellSize && mouseY < y * cellSize + cellSize) {
          if (topGrid[y][x] === CLOSED_TILE) {
            topGrid[y][x] = FLAGGED_TILE; // Flag the tile
          }
          else if (topGrid[y][x] === FLAGGED_TILE) {
            topGrid[y][x] = CLOSED_TILE; // Unflag the tile
          }
        }
      }
    }
  }
}
function resetGame() {
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  } 
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
  topGrid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  mineGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Recalculate cell size based on new window dimensions
  resetGame();
}

