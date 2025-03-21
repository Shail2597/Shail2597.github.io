// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x = 0;
let y = 0;

const CELLSIZE = 50;

let board = [[0,1,1,0],
  [1,1,0,0],
  [0,0,1,1],
  [0,1,0,0]];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawBoard(board);
}

function drawBoard(array){
  for (let row in array){
    for (let item in array[row]){
      if (thing === 1){
        fill(0);
        rect(x,y,CELLSIZE,CELLSIZE);
      }
      else if (thing === 0) {
        fill(255);
        rect(x,y,CELLSIZE,CELLSIZE);
      }
      x+=CELLSIZE;
    }
    y+=CELLSIZE;
  }
}
