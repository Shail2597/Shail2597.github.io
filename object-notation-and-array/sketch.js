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
  for (let i = 0; i < 3; i++) {
    balls[i] = [];
    for (let j = 0; j < 4; j++) {
      balls[i].push({
        x: containers[i].x,
        y:(height -  containers[i].y) + containers[i].height - ball_diameter/2,
        colour: colours[j % colours.length],
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