// Tower of Hanoi
// Shail Chaudhari
// 26 February 2025
//
// Extra for Experts:
// - I have used the windowResized function to resize the canvas when the window is resized
// - I have used the mouseWheel function to increase the number of disks when the mouse wheel is scrolled UP and DECREASE the number of disks when the mouse wheel is scrolled DOWN
// - I have also used constrain function to limit the number of disks between 1 and 10


let towers = [[],[],[]];
let numberOfDisks = 5;
let colors, steps, tower_height, tower_width, tower_x, tower_y, idealSteps, discSize;
let isDiskSelected = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  declareVariables();
  initializeTowers();
  generateDiscColors();
}


function draw() {
  background(220);
  drawTowers();
  drawDiscs();
  displayInstructions();
}

function declareVariables(){
  tower_x = width/4;
  tower_y = height/2;
  tower_width = 10;
  tower_height = height * 0.55;
  discSize = tower_height/15;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  declareVariables();
}

function generateDiscColors(){
  colors = [];
  for (let i = 0; i < numberOfDisks; i++)
  {
    colors.push(color(random(255), random(255), random(255)));
  }
}

function initializeTowers(){
  towers = [[],[],[]];
  for (let i = numberOfDisks; i > 0; i--)
  {
    towers[0].push(i);
  }
  steps = 0;
}

function drawTowers(){              
  for (let i = 1; i < 4; i++) 
  {
    stroke(0);
    fill(255);
    rectMode(CENTER);
    rect(i * tower_x, tower_y, tower_width, tower_height); // Draw each tower as a rectangle
  }
}

function drawDiscs(){
  for (let i = 0; i < 3; i++)
  {
    for (let j = 0; j < towers[i].length; j++)
    {
      fill(colors[towers[i][j]-1]);
      stroke(0);
      rectMode(CENTER);
      rect((i+1) * tower_x, (tower_y-j*discSize) + (tower_height/2) - (discSize/2),( discSize * towers[i][j]) ,discSize);
    }
  }
}

function mousePressed(){
  for (let i =1;i<4;i++){
    if (mouseX>(i * tower_x - 3*tower_width) && mouseX<(i * tower_x + 3*tower_width) && mouseY>(tower_y - tower_height/2 - 30 ) && mouseY<(tower_y + tower_height/2 + 30 )){
      if (!isDiskSelected){
        isDiskSelected = true;
        console.log("Disk Selected");

      }
    }
  }
}

function keyPressed(){
  if (key === 'r' || key === 'R')
  {
    numberOfDisks = 5;
    initializeTowers();
    generateDiscColors();
    idealSteps = pow(2, numberOfDisks) - 1;
  }
}

function mouseWheel(event){
  numberOfDisks = constrain((numberOfDisks + (event.delta>0 ? 1 : -1)), 1, 10);
  idealSteps = pow(2, numberOfDisks) - 1;
  initializeTowers();
  generateDiscColors();
}

function displayInstructions(){
  fill(0);
  textSize(40);
  text("Tower of Hanoi", 10, 50);
  textSize(20);
  text("Number of Disks: " + numberOfDisks, 10, 75);
  text("Steps: " + steps, 10,100);
  text("Ideal Steps: " + idealSteps, 10, 125);
  text("Instructions:", 10, height - 110);
  text("Click on a disk to select it", 10, height - 85);
  text("Click on a tower to move the selected disk to that tower", 10, height - 60);
  text("Press 'R' to reset the game", 10, height - 35);
  text("Use the mouse wheel to increase or decrease the number of disks", 10, height - 10);
}