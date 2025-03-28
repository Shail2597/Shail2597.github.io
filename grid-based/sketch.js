// Minesweeper
// Shail Chaudhari
// March 28, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cellSize;
const SQUARE_DIMENSIONS = 10;
let topGrid, mineGrid;
const OPEN_TILE = 0;
const CLOSED_TILE = 1;
const MINE_TILE = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //make the largest square that fits
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
  topGrid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  mineGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);

  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    topGrid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
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
      if (mineGrid[y][x] === OPEN_TILE) {
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
      if (random(100) < 50) {
        newGrid[y].push(MINE_TILE);
      }
    }
  }
  return newGrid;
}

function mousePressed(){
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if ( mouseX > x * cellSize && mouseX<x * cellSize + cellSize  && mouseY > y * cellSize && mouseY < y * cellSize + cellSize ) {
        if (topGrid[y][x] === CLOSED_TILE){
          if (mineGrid[y][x] === OPEN_TILE) {
            topGrid[y][x] = OPEN_TILE ;
          }
          // else if (grid[y][x] === MINE_TILE) {
          // }
        }
      }
    }
  }
}