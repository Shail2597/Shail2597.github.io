// Minesweeper
// Shail Chaudhari
// March 28, 2025

// Extra for Experts:
// - Learnt and implemented the recursive backtracking algorithm to open all the connected empty tiles at once:
//   - Used a stack-based approach to avoid recursion depth issues.
//   - Ensures that all adjacent empty tiles are opened efficiently without unnecessary checks.
//   - Handles edge cases like boundaries and tiles with adjacent mines.
// - Added a sound effect for the mine explosion

alert("Welcome to Minesweeper! Your goal is to uncover all tiles without clicking on a mine.");
alert("Controls:\n- Left Click: Open a tile\n- Right Click: Flag/Unflag a tile\n- Press 'R': Restart the game");

// Global Variables
let cellSize; // Size of each cell in the grid
const SQUARE_DIMENSIONS = prompt("Enter the number of squares per side", 10); // Default to 10 if invalid
let topGrid, mineGrid; // Grids for game state and mine locations
const OPEN_TILE = 0; // Tile is open
const CLOSED_TILE = 1; // Tile is closed
const FLAGGED_TILE = 2; // Tile is flagged
const MINE_TILE = 3; // Tile contains a mine
const MINE_FLAGGED_TILE = 4; // Tile is a flagged mine
const CLICKED_MINE_TILE = 5; // Tile is a clicked mine
let gameOver = false; // Game over flag
let images = {}; // Object to store images for tiles
let blastSound; // Sound effect for mine explosion
const MINE_DENSITY = 0.125; // 12.5% of tiles are mines

// Preload images for different tile states
function preload() {
  // Load images for different tile states
  images.closed = loadImage("images/closed.png");
  images.open = loadImage("images/open.png");
  images.flag = loadImage("images/flag.png");
  images.mine = loadImage("images/mine.png");
  images.flaggedMine = loadImage("images/flagged_mine.png");
  images.clickedMine = loadImage("images/clicked_mine.png");
  images.numbers = [];
  for (let i = 1; i <= 8; i++) {
    images.numbers[i] = loadImage(`images/${i}.png`); // Load images for numbered tiles
  }

  // Load the blast sound effect
  blastSound = loadSound("blast.mp3");
}

// Setup function to initialize the game
function setup() {
  createCanvas(windowHeight * 0.7, windowHeight * 0.7); // Create a square canvas
  document.addEventListener("contextmenu", event => event.preventDefault()); // Disable right-click menu
  resetGame(); // Initialize the game state
}

// Main draw loop
function draw() {
  background(220); // Light gray background
  displayGrid(); // Display the grid with the current game state
  if (gameOver) {
    gameisOver(); // Show "Game Over" message if the game is over
  }
}

// Handle key presses
function keyPressed() {
  if (key === "r") { // Restart the game when 'R' is pressed
    resetGame();
    gameOver = false; // Reset the game over flag
  }
}

// Display the grid with appropriate images
function displayGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      let img;

      // Determine the image to display based on the tile state
      if (topGrid[y][x] === CLOSED_TILE) {
        img = images.closed; // Closed tile
      }
      else if (topGrid[y][x] === OPEN_TILE) {
        let adjacentMines = countAdjacentMines(x, y); // Count adjacent mines
        img = adjacentMines > 0 ? images.numbers[adjacentMines] : images.open; // Numbered or empty tile
      }
      else if (topGrid[y][x] === FLAGGED_TILE) {
        img = images.flag; // Flagged tile
      }
      else if (topGrid[y][x] === MINE_TILE) {
        img = images.mine; // Mine tile
      }
      else if (topGrid[y][x] === MINE_FLAGGED_TILE) {
        img = images.flaggedMine; // Correctly flagged mine
      }
      else if (topGrid[y][x] === CLICKED_MINE_TILE) {
        img = images.clickedMine; // Clicked mine
      }

      // Draw the image on the canvas
      image(img, x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

// Generate a grid with all tiles initialized as CLOSED_TILE
function generateGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(CLOSED_TILE); // Initialize all tiles as closed
    }
  }
  return newGrid;
}

// Generate a grid with random mine placements
function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE); // Initialize all cells as open
    }
  }

  // Place mines randomly
  let minesToPlace = Math.floor(cols * rows * MINE_DENSITY); // Calculate the number of mines
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

// Count the number of mines adjacent to a given tile
function countAdjacentMines(x, y) {
  let count = 0;
  for (let j = -1; j <= 1; j++) { // Loop through neighboring rows
    for (let i = -1; i <= 1; i++) { // Loop through neighboring columns
      if (i === 0 && j === 0) {
        continue; // Skip the current tile
      }

      let newX = x + i;
      let newY = y + j;

      // Check if the new coordinates are within bounds
      if (newX >= 0 && newX < SQUARE_DIMENSIONS && newY >= 0 && newY < SQUARE_DIMENSIONS) {
        if (mineGrid[newY][newX] === MINE_TILE) {
          count++; // Increment count if a mine is found
        }
      }
    }
  }
  return count;
}

// Handle mouse clicks
function mousePressed() {
  if (!gameOver) { // Only process clicks if the game is not over
    if (mouseButton === LEFT) {
      handleLeftClick(); // Handle left mouse click
    }
    else if (mouseButton === RIGHT) {
      handleRightClick(); // Handle right mouse click
    }
  }
}

// Handle left mouse click
function handleLeftClick() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      // Check if the mouse is within the bounds of the current tile
      if (mouseX > x * cellSize && mouseX < x * cellSize + cellSize &&
          mouseY > y * cellSize && mouseY < y * cellSize + cellSize) {
        if (topGrid[y][x] === CLOSED_TILE) { // Only process closed tiles
          if (mineGrid[y][x] === MINE_TILE) {
            topGrid[y][x] = CLICKED_MINE_TILE; // Set the clicked mine
            blastSound.setVolume(1.0); // Set volume to maximum
            blastSound.jump(1); // Jump to 1 second in the audio file 
            blastSound.play(); // Start playing the sound
            gameOver = true; // Set game over flag
            revealAllTiles(); // Reveal all tiles
          }
          else {
            openEmptyTiles(x, y); // Open empty tiles or numbered tile
          }
        }
      }
    }
  }
}

// Handle right mouse click (flagging/unflagging tiles)
function handleRightClick() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      // Check if the mouse is within the bounds of the current tile
      if (mouseX > x * cellSize && mouseX < x * cellSize + cellSize &&
          mouseY > y * cellSize && mouseY < y * cellSize + cellSize) {
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

// Reveal all tiles at the end of the game
function revealAllTiles() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (topGrid[y][x] === CLICKED_MINE_TILE) {
        continue; // Do not overwrite the clicked mine tile
      }

      if (mineGrid[y][x] === MINE_TILE) {
        blastSound.setVolume(1.0); // Set volume to maximum
        blastSound.jump(1); // Jump to 1 second in the audio file 
        blastSound.play();
        topGrid[y][x] = topGrid[y][x] === FLAGGED_TILE ? MINE_FLAGGED_TILE : MINE_TILE; // Show mines
      }
      else if (topGrid[y][x] === FLAGGED_TILE && mineGrid[y][x] !== MINE_TILE) {
        topGrid[y][x] = FLAGGED_TILE; // Incorrectly flagged tile
      }
      else {
        topGrid[y][x] = OPEN_TILE; // Open non-mine tiles
      }
    }
  }
}

// Reset the game state
function resetGame() {
  cellSize = min(width, height) / SQUARE_DIMENSIONS; // Calculate cell size
  topGrid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS); // Initialize top grid
  mineGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS); // Initialize mine grid
  gameOver = false; // Reset game over flag
}

// Adjust canvas size on window resize
function windowResized() {
  resizeCanvas(windowHeight*0.7, windowHeight*0.7); // Resize the canvas
  resetGame(); // Reset the game state
}



// Open empty tiles using a stack to avoid recursion
function openEmptyTiles(x, y) {
  let stack = [[x, y]]; // Initialize the stack with the starting tile

  while (stack.length > 0) {
    let [currentX, currentY] = stack.pop(); // Get the current tile from the stack
    // Check if the tile is already opened
    if (topGrid[currentY][currentX] !== CLOSED_TILE) {
      continue; // Skip if the tile is already open
    }

    // Open the tile
    topGrid[currentY][currentX] = OPEN_TILE;
    // Count adjacent mines
    let adjacentMines = countAdjacentMines(currentX, currentY);
    // If there are no adjacent mines, add neighboring tiles to the stack
    if (adjacentMines === 0) {
      for (let j = -1; j <= 1; j++) { // Loop through neighboring rows
        for (let i = -1; i <= 1; i++) { // Loop through neighboring columns
          if (Math.abs(i) + Math.abs(j) === 1) { // Only consider edge neighbors
            let newX = currentX + i;
            let newY = currentY + j;

            // Check bounds
            if (newX >= 0 && newX < SQUARE_DIMENSIONS && newY >= 0 && newY < SQUARE_DIMENSIONS) {
              stack.push([newX, newY]); // Add the neighboring tile to the stack
            }
          }
        }
      }
    }
  }
}



// Display "Game Over" message
function gameisOver() {
  fill(0); // Black text
  textSize(32);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2 - 20); // Display "Game Over" message
  textSize(16);
  text("Press 'R' to Restart", width / 2, height / 2 + 20); // Display restart instructions
}

