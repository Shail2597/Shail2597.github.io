// Character Movement 
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grassImg;
let pathImg;

let cellSize = 50;
let grid;
let cols;
let rows;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;

let thePlayer = {
  x:0,
  y:0,
};

function preload(){
  grassImg = loadImage("grass.png");
  pathImg = loadImage("paving.png");
}

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight*0.8);
  cols = Math.floor(width/cellSize);
  rows = Math.floor(height/cellSize);
  grid = generateRandomGrid();

  grid[thePlayer.y][thePlayer.x] = PLAYER;
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
        newgrid[y].push(IMPASSIBLE);
      }
      else {
        newgrid[y].push(OPEN_TILE
        );
      }
    }
  }
  return newgrid;
}

function drawGrid(){
  for (let y = 0; y< grid.length; y ++){
    for (let x = 0; x< grid[y].length; x ++){
      if (grid[y][x] === IMPASSIBLE) {
        image(grassImg, x * cellSize, y * cellSize, cellSize,cellSize);
        // fill("black");
      }
      else if (grid[y][x] === OPEN_TILE) {
        image(pathImg, x * cellSize, y * cellSize, cellSize,cellSize);
        //fill("white");
      }
      else if (grid[y][x] === PLAYER){
        fill("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  if (x >= 0 && x< cols && y >= 0 && y < rows){
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed() {
  if (key === "ArrowUp") {
    //move up
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "ArrowDown") {
    //move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "ArrowLeft") {
    //move left
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "ArrowRight") {
    //move right
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x< cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE){
  // Previous Location
    let oldX =thePlayer.x;
    let oldY = thePlayer.y;


    //keep track of where the player is now
    thePlayer.x = x;
    thePlayer.y = y;

    grid[oldY][oldX] = OPEN_TILE;

    //put player on grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
}