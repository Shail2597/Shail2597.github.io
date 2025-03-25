// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize = 50;
let grid;
let cols;
let rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/cellSize);
  rows = Math.floor(height/cellSize);
  grid = generateRandomGrid();
}

function draw() {
  background(220);
  drawGrid();
}

function generateRandomGrid(){
  newgrid = [];
  for (let y = 0; y<= rows; y ++){
    newgrid.push([]);
    for (let x = 0; x<= cols; x ++){
      if (random(100) > 50) {
        newgrid[y].push(1);
      }
      else {
        newgrid[y].push(0);
      }
    }
  }
  return newgrid;
}

function drawGrid(){
  for (let y = 0; y< grid.length; y ++){
    for (let x = 0; x< grid[y].length; x ++){
      if (grid[y][x] === 1) {
        stroke(255);
        fill("black");
      }
      else if (grid[y][x] === 0) {
        stroke(0);
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}
