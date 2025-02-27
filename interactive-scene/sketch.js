// Tower of Hanoi
// Shail Chaudhari
// 26 February 2025
//
// Extra for Experts:
// - I have used the windowResized function to resize the canvas when the window is resized
// - I have used the mouseWheel function to move the disks


let towers = [[],[],[]];
let numberOfDisks = 5;
let colors, steps;

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  let tower_width = width/3 - 50;
  for (let i = 0; i < 3; i++) {
    rect((i + 1) * tower_width, height / 3 - 100, 20, 200); // Draw each tower as a rectangle
  }