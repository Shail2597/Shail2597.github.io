// Tower of Hanoi
// Shail Chaudhari
// 26 February 2025
//
// Extra for Experts:
// - I have used the windowResized function to resize the canvas when the window is resized
// - I have used the mouseWheel function to INCREASE the number of disks when the mouse wheel is scrolled UP and DECREASE the number of disks when the mouse wheel is scrolled DOWN
// - I have also used constrain function to limit the number of disks between 1 and 15
// - I have also extensive use of arrays to store the disks and their colors, and to keep track of the towers

// Declaring the Necessary Variables
let towers = [[], [], []];
let numberOfDisks = 5;
let colors, steps, tower_height, tower_width, tower_x, tower_y, idealSteps, discSize, selectedDisk, selectedDiskIndex;
let isDiskSelected = false;

// Creacting the Canvas and initializing the Towers
function setup() {
  createCanvas(windowWidth, windowHeight);
  declareVariables();
  initializeTowers();
  generateDiscColors();
}


// The Main Draw Function Which Draws the Towers and Discs but No Mechnisms for the Game
function draw() {
  background(220);
  drawTowers();
  drawDiscs();
  displayInstructions();
  displayRules();
}

// Function to Declare the Variables that are Dependent on the Width and Height of the Canvas and do not change during the game
function declareVariables() {
  tower_x = width / 4;
  tower_y = height / 2;
  tower_width = 10;
  tower_height = height * 0.55;
  discSize = tower_height / 15;
}

// Function to Resize the Canvas When the Window is Resized(this also satisfies the extra for experts criteria)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  declareVariables();
}

// Function to Generate Random Colors for the Disks
function generateDiscColors() {
  colors = [];
  // This generates a random color for each disk and pushes it into the colors array
  for (let i = 0; i < numberOfDisks; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}


// Function to Initialize the Towers which puts the disks into the first tower in descending order
function initializeTowers() {
  towers = [[], [], []];
  for (let i = numberOfDisks; i > 0; i--) {
    towers[0].push(i);
  }
  steps = 0;
}

// This is a very basic function that draws the towers as rectangles
function drawTowers() {
  for (let i = 1; i < 4; i++) {
    stroke(0);
    fill(255);
    rectMode(CENTER);
    rect(i * tower_x, tower_y, tower_width, tower_height); // Draw each tower as a rectangle
  }
}

// This is also a basic function draws the discs on the towers
function drawDiscs() {
  // Nested For Loop to draw the discs on the towers
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < towers[i].length; j++) {
      fill(colors[towers[i][j] - 1]);
      stroke(0);
      rectMode(CENTER);
      rect((i + 1) * tower_x, tower_y - j * discSize + tower_height / 2 - discSize / 2, discSize * towers[i][j], discSize);
    }
  }
}


// This is the whole game logic | It contains the logic for selecting and moving the disks, which includes a state variable to keep track if disk selected or not
function mousePressed() {
  // Loop that cycles through the towers
  for (let i = 0; i < 3; i++) {
    // If the mouse is clicked on/within close range of a tower
    if (mouseX > (i + 1) * tower_x - tower_width * 3 && mouseX < (i + 1) * tower_x + 3 * tower_width && mouseY > tower_y - tower_height / 2 - 30 && mouseY < tower_y + tower_height / 2 + 30) {
      if (isDiskSelected) {
        // checks if the selected disk can be placed on the tower and place it if yes.
        if (towers[i].length === 0 || towers[i][towers[i].length - 1] > selectedDisk) {
          towers[i].push(selectedDisk);
          steps++;
          isDiskSelected = false;
        }
      }
      // If the disk is not selected, then select the disk(if possible)
      else {
        if (towers[i].length > 0) {
          selectedDisk = towers[i][towers[i].length - 1];
          isDiskSelected = true;
          towers[i].pop();
        }
      }
    }
  }
}

// Function to Reset the Game When the 'R' Key is Pressed
function keyPressed() {
  if (key === "r" || key === "R") {
    numberOfDisks = 5;
    initializeTowers();
    generateDiscColors();
    idealSteps = pow(2, numberOfDisks) - 1;
  }
}

// Function That Increases or Decreases the Number of Disks Using the Mouse Wheel(This also satisfies the extra for experts criteria)
function mouseWheel(event) {
  numberOfDisks = constrain(numberOfDisks + (event.delta > 0 ? 1 : -1), 1, 15);
  idealSteps = pow(2, numberOfDisks) - 1;
  initializeTowers();
  generateDiscColors();

  selectedDisk = null;
  isDiskSelected = false;
}

// Function That Displays Instructions
function displayInstructions() {
  textAlign(LEFT);
  fill(0);
  // Top Left Corner
  textSize(40);
  text("Tower of Hanoi", 10, 50);

  textSize(20);
  text("Number of Disks: " + numberOfDisks, 10, 75);
  text("Steps: " + steps, 10, 100);
  text("Ideal Steps: " + idealSteps, 10, 125);

  // Bottom Left Corner
  textSize(21);
  text("Instructions:", 10, height - 110);
  textSize(17);
  text("Click on a disk to select it", 10, height - 85);
  text("Click on a tower to move the selected disk to that tower", 10, height - 60);
  text("Press 'R' to reset the game", 10, height - 35);
  text("Use the mouse wheel to increase or decrease the number of disks", 10, height - 10);
}

// Function to display the rules of the game
function displayRules() {
  textAlign(RIGHT);
  textSize(20);
  text("Game Rules", width - 10, 25); // Display the title of the rules

  textSize(15);
  text("1. Only one disk can be moved at a time", width - 10, 50);
  text("2. Each move consists of taking the top disk from one of the stacks and placing it on top of another stack", width - 10, 75);
  text("3. No disk may be placed on top of a smaller disk", width - 10, 100);
}
