// Tower of Hanoi
// Shail Chaudhari
// 26 February 2025
//
// Extra for Experts:
// - I have used the windowResized function to resize the canvas when the window is resized
// - I have used the mouseWheel function to increase the number of disks when the mouse wheel is scrolled UP and DECREASE the number of disks when the mouse wheel is scrolled DOWN


let towers = [[],[],[]];
let numberOfDisks = 5;
let colors, steps, tower_height, tower_width, tower_x, tower_y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  tower_x = width/4;
  tower_y = height/3;
  tower_width = 10;
  tower_height = tower_y * 3/2;
  initializeTowers();
  generateDiscColors();
}

function draw() {
  background(220);
  drawTowers();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function generateDiscColors(){
  colors = [];
  for (let i = 0; i < numberOfDisks; i++){
    colors.push(color(random(255), random(255), random(255)));
  }
}

function initializeTowers(){
  towers = [[],[],[]];
  for (let i = numberOfDisks; i > 0; i--){
    towers[0].push(i);
  }
  steps = 0;
}

function drawTowers(){              
  for (let i = 1; i < 4; i++) 
  {
    stroke(0);
    fill(255);
    rect(i * tower_x, tower_y, tower_width, tower_height); // Draw each tower as a rectangle
  }
}