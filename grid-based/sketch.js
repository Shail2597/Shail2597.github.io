// Minesweeper
// Shail Chaudhari
// March 28, 2025

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize;
const SQUARE_DIMENSIONS = 10;
let topGrid, mineGrid;
const OPEN_TILE = 0;
const CLOSED_TILE = 1;
const FLAGGED_TILE = 2; 
const MINE_TILE = 3;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault()); // Prevent default context menu on right-click
  resetGame();
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    resetGame();
    gameOver = false; // Reset game over flag
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
      
      // Display the number of adjacent mines if the tile is opened
      if (topGrid[y][x] === OPEN_TILE) {
        let adjacentMines = countAdjacentMines(x, y);
        if (adjacentMines > 0) {
          textSize(cellSize / 2);
          textAlign(CENTER, CENTER);
          fill(0);
          text(adjacentMines, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
        }
      }
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
    }
  }
  
  // Place mines randomly
  let minesToPlace = Math.floor(cols * rows * 0.125); // Adjust the number of mines
  while (minesToPlace > 0) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    if (newGrid[y][x] !== MINE_TILE) {
      newGrid[y][x] = MINE_TILE; // Place a mine
      minesToPlace--;
    }
  }
  
  return newGrid;
}

function countAdjacentMines(x, y) {
  let count = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      // Skip the current cell
      if (i === 0 && j === 0) {
        continue;
      } 
      
      let newX = x + i;
      let newY = y + j;
      
      // Check if the new coordinates are within bounds
      if (newX >= 0 && newX < SQUARE_DIMENSIONS && newY >= 0 && newY < SQUARE_DIMENSIONS) {
        if (mineGrid[newY][newX] === MINE_TILE) {
          count++;
        }
      }
    }
  }
  return count;
}

function mousePressed() {
  if (!gameOver){
    if (mouseButton === LEFT) {
      for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
        for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
          if (mouseX > x * cellSize && mouseX < x * cellSize + cellSize && mouseY > y * cellSize && mouseY < y * cellSize + cellSize) {
            if (topGrid[y][x] === CLOSED_TILE) {
              if (mineGrid[y][x] === MINE_TILE) {
                topGrid[y][x] = MINE_TILE; // Reveal the mine
                gameOver = true; // Set game over flag
                for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
                  for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
                    if (mineGrid[y][x] === MINE_TILE) {
                      topGrid[y][x] = MINE_TILE;
                    }
                  }
                }
                console.log("Game Over! You clicked on a mine.");
              }
              else {
                openEmptytiles(x, y); // Open adjacent tiles recursively
                topGrid[y][x] = OPEN_TILE;
                let adjacentMines = 0;
                for (let j = -1; j <= 1; j++) {
                  for (let i = -1; i <= 1; i++) {
                    if (y + j >= 0 && y + j < SQUARE_DIMENSIONS && x + i >= 0 && x + i < SQUARE_DIMENSIONS) {
                      if (mineGrid[y + j][x + i] === MINE_TILE) {
                        adjacentMines++;
                      }
                    }
                  }
                }
                if (adjacentMines > 0) {
                  textSize(cellSize / 2);
                  textAlign(CENTER, CENTER);
                  text(adjacentMines, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
                  // topGrid[y][x] = adjacentMines; // Display the number of adjacent mines
                }
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

function openEmptytiles(x, y) {
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (y + j >= 0 && y + j < SQUARE_DIMENSIONS && x + i >= 0 && x + i < SQUARE_DIMENSIONS) {
        if (topGrid[y + j][x + i] === CLOSED_TILE) {
          topGrid[y + j][x + i] = OPEN_TILE;
          let adjacentMines = countAdjacentMines(x + i, y + j);
          if (adjacentMines === 0) {
            openEmptytiles(x + i, y + j); // Recursively open adjacent tiles
          }
        }
      }
    }
  }
}