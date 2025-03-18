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
let selectedBall = null;
let selectedContainer = null;


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
  ball_diameter = containerWidth * 0.75;
  containerHeight =  ball_diameter*4;
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
  for (let i = 0; i < 4; i++) { // Ensure all 4 containers are initialized
    balls[i] = []; // Initialize an empty array for each container
  }
  for (let i = 0; i < 3; i++) {
    let shuffledColours = shuffle([...colours]); // Shuffle the colors for each container
    for (let j = 0; j < 4; j++) {
      balls[i].push({
        x: containers[i].x,
        y: containers[i].y + containerHeight / 2 - ball_diameter / 2 - (j * ball_diameter),
        colour: shuffledColours[j % shuffledColours.length],
      });
    }
  }
}

function drawBalls() {
  for (let containerIndex in balls) {
    for (let ball of balls[containerIndex]) {
      fill(ball.colour);
      noStroke();
      ellipse(ball.x, ball.y, ball_diameter);
    }
  }
}

function mousePressed() {
  if (selectedBall === null) {
    // Select a ball
    for (let containerIndex in balls) {
      let containerBalls = balls[containerIndex];
      if (containerBalls.length > 0) {
        let topBall = containerBalls[containerBalls.length - 1]; // Get the topmost ball
        let distance = dist(mouseX, mouseY, topBall.x, topBall.y);
        if (distance < ball_diameter / 2) {
          selectedBall = topBall;
          selectedContainer = containerIndex;
          balls[containerIndex].pop(); // Remove the ball from its container
          return;
        }
      }
    }
  } else {
    // Place the ball in a new container
    for (let containerIndex in containers) {
      let container = containers[containerIndex];
      if (
        mouseX > container.x - container.width / 2 &&
        mouseX < container.x + container.width / 2 &&
        mouseY > container.y - container.height / 2 &&
        mouseY < container.y + container.height / 2
      ) {
        // Check if the container is not full
        if (balls[containerIndex].length < 4) {
          selectedBall.x = container.x;
          selectedBall.y =
            container.y +
            containerHeight / 2 -
            ball_diameter / 2 -
            balls[containerIndex].length * ball_diameter;
          balls[containerIndex].push(selectedBall); // Add the ball to the new container
          selectedBall = null;
          selectedContainer = null;
          return;
        } else {
          console.log("Container is full!"); // Optional feedback
        }
      }
    }
    // If no valid container is clicked, return the ball to its original container
    balls[selectedContainer].push(selectedBall);
    selectedBall = null;
    selectedContainer = null;
  }
}