// Object & Array Notation
// Ball Sort Game
// Shail Chaudhari
// 11 March 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let video;
let colours = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown"];
let balls = {};
let containerWidth, containerHeight, ball_diameter;
let containers = {};


function setup() {
  video = createCapture(VIDEO);
  createCanvas(windowWidth, windowHeight);
  video.size(width, height);
  updateDimensions();
  createContainers();
}

function draw() {
  background(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateDimensions();
  createContainers();
}

function createContainers() {
  containers = {};
  for (let i = 0; i < 7; i++) {
    containers[i] = {
      x: (i + 1) * width / 8,
      y: height / 2,
      width: containerWidth,
      height: containerHeight,
    };
  }
}

function updateDimensions() {
  containerWidth = width / 8;
  containerHeight = height * 0.6;
  ball_diameter = containerWidth;
}


function drawContainers(){
  for (let key in containers) {
    let container = containers[key];
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(container.x, container.y, container.width, container.height);
  }
}
