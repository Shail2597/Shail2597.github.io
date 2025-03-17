// Object & Array Notation
// Ball Sort Game
// Shail Chaudhari
// 11 March 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let colours = ["red", "green", "blue", "yellow"];
let balls = {};
let containerWidth, containerHeight, ball_diameter;
let containers = {};


function setup() {
  createCanvas(windowWidth, windowHeight);
  updateDimensions();
  createContainers();
  createBall();
}

function draw() {
  background(255);
  drawContainers();
  drawBalls();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateDimensions();
  createContainers();
  createBall();
}

function createContainers() {
  containers = {};
  for (let i = 0; i < 4; i++) {
    containers[i] = {
      x: (i + 1) * width / 5,
      y: height*2/3,
      width: containerWidth,
      height: containerHeight,
    };
  }
}

function updateDimensions() {
  containerWidth = width / 10;
  containerHeight = height * 0.6;
  ball_diameter = containerWidth;
}


function drawContainers(){
  for (let item in containers) {
    let container = containers[item];
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(container.x, container.y, container.width, container.height);
  }
}

function createBall() {
  balls = {};
  for (let i = 0; i < 3; i++) {
    balls[i] = [];
    for (let j = 0; j < 4; j++) {
      balls[i].push({
      // Random x position within the container
        x: containers[i].x + random(-containerWidth / 2 + ball_diameter / 2, containerWidth / 2 - ball_diameter / 2),
        // Random y position within the container
        y: containers[i].y + random(-containerHeight / 2 + ball_diameter / 2, containerHeight / 2 - ball_diameter / 2),
        // Assign a color from the colours array
        Colour: colours[j % colours.length],
      });
    }
  }
}

function drawBalls() {
  // Loop through each container in the balls object
  for (let containerIndex in balls) {
    // Loop through each ball in the container
    for (let ball of balls[containerIndex]) {
      // Set the fill color to the ball's color
      fill(ball.Colour);
      // Disable stroke
      noStroke();
      // Draw the ball as an ellipse at its position with the specified diameter
      ellipse(ball.x, ball.y, ball_diameter);
    }
  }
}