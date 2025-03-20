// Object & Array Notation
// Ball Sort Game
// Shail Chaudhari
// 11 March 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Define the colors for the balls
let colours = ["red", "green", "blue", "yellow"];

// Initialize variables for balls, containers, and dimensions
let balls = {};
let containerWidth, containerHeight, ball_diameter;
let containers = {};
let containerBalls;
let selectedBall = null; // Currently selected ball
let selectedContainer = null; // Container of the selected ball
let gameOver = false; // Flag to indicate if the game is over

let videoCanvas;
let gameCanvas;
let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
}

function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  gameCanvas = createGraphics(windowWidth, windowHeight);  
  // Create video capture
  video = createCapture(VIDEO, {flipped: true});
  video.size(windowWidth, windowHeight);
  video.hide(); // Hide the video element
  
  // Initialize game elements
  updateDimensions();
  createContainers();
  createBall();
}


function draw() {
  image(video, 0, 0, width, height);
  handPose.detect(video, gotHands);
  // Step 1: Clear the background with white
  //gameCanvas.background(255);
  // Step 2: Draw the game elements on top of the white background
  drawContainers();
  drawBalls();
  // Step 3: Handle finger touch for painting, which will draw on top
  fingerTouch();
  image(gameCanvas, 0, 0);
  gameWon();
}


function windowResized() {
  // Handle window resizing and update game elements
  resizeCanvas(windowWidth, windowHeight);
  updateDimensions();
  createContainers();
  createBall();
}

function createContainers() {
  // Create container objects with positions and dimensions
  containers = {};
  for (let i = 0; i < 4; i++) {
    containers[i] = {
      x: (i + 1) * width / 5,
      y: height * 2 / 3,
      width: containerWidth,
      height: containerHeight,
    };
  }
}

function updateDimensions() {
  // Update dimensions for containers and balls based on canvas size
  containerWidth = width / 10;
  ball_diameter = containerWidth * 0.75;
  containerHeight = ball_diameter * 4;
}

function drawContainers() {
  // Draw all containers on the canvas
  for (let item in containers) {
    let container = containers[item];
    gameCanvas.fill(255);
    gameCanvas.stroke(0);
    gameCanvas.rectMode(CENTER);
    gameCanvas.rect(container.x, container.y, container.width, container.height);
  }
}

function createBall() {
  // Initialize balls and assign them to containers
  balls = {};
  for (let i = 0; i < 4; i++) {
    balls[i] = []; // Initialize an empty array for each container
  }
  for (let i = 0; i < 3; i++) {
    let shuffledColours = shuffle(colours); // Shuffle the colors for randomness
    for (let j = 0; j < 4; j++) {
      balls[i].push({
        x: containers[i].x,
        y: containers[i].y + containerHeight / 2 - ball_diameter / 2 - j * ball_diameter,
        colour: shuffledColours[j % shuffledColours.length],
      });
    }
  }
}

function drawBalls() {
  // Draw all balls in their respective containers
  for (let containerIndex in balls) {
    for (let ball of balls[containerIndex]) {
      gameCanvas.fill(ball.colour);
      gameCanvas.noStroke();
      gameCanvas.ellipse(ball.x, ball.y, ball_diameter);
    }
  }
}

function mousePressed() {
  if (gameOver) {
    return;
  } // Prevent interaction if the game is over
  if (selectedBall === null) {
    // Select a ball if none is currently selected
    for (let containerIndex in balls) {
      containerBalls = balls[containerIndex];
      if (containerBalls.length > 0) {
        let topBall = containerBalls[containerBalls.length - 1]; // Get the topmost ball
        let distance = dist(mouseX, mouseY, topBall.x, topBall.y);
        if (distance < ball_diameter / 2) {
          selectedBall = topBall; // Mark the ball as selected
          selectedContainer = containerIndex; // Store its container
          balls[containerIndex].pop(); // Remove the ball from its container
          return;
        }
      }
    }
  }
  else {
    // Place the selected ball in a new container
    for (let containerIndex in containers) {
      let container = containers[containerIndex];
      if (mouseX > container.x - container.width / 2 && mouseX < container.x + container.width / 2 && mouseY > container.y - container.height / 2 && mouseY < container.y + container.height / 2 ) {
        // Check if the container is not full
        if (balls[containerIndex].length < 4) {
          selectedBall.x = container.x; // Update ball's position
          selectedBall.y =
            container.y +
            containerHeight / 2 -
            ball_diameter / 2 -
            balls[containerIndex].length * ball_diameter;
          balls[containerIndex].push(selectedBall); // Add the ball to the new container
          selectedBall = null; // Reset selection
          selectedContainer = null;

          return;
        }
        else {
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

function fingerTouch() {
  if (gameOver){
    return;
  } // Prevent interaction if the game is over
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    // Compute midpoint between index finger and thumb
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    // Calculate the distance between index finger and thumb
    let d = dist(index.x, index.y, thumb.x, thumb.y);

    if (d < 35) { // Pinch gesture detected
      if (selectedBall === null) {
        // Try to pick up the topmost ball from a container
        for (let containerIndex in containers) {
          let container = containers[containerIndex];
          // Check if the pinch is over a container
          if ( x > container.x - container.width / 2 && x < container.x + container.width / 2 && y > container.y - container.height / 2 && y < container.y + container.height / 2 ) {
            containerBalls = balls[containerIndex];
            if (containerBalls.length > 0) {
              selectedBall = containerBalls.pop(); // Pick up the topmost ball
              selectedContainer = containerIndex; // Store the container index
              console.log("Picked up ball:", selectedBall);
            }
            return;
          }
        }
      }
    } 
    else if (d > 55 && selectedBall !== null) { // Release gesture detected
      // Try to place the ball in a container
      for (let containerIndex in containers) {
        let container = containers[containerIndex];

        // Check if the release is over a container
        if ( x > container.x - container.width / 2 && x < container.x + container.width / 2 && y > container.y - container.height / 2 && y < container.y + container.height / 2 ) {
          // Check if the container is not full
          if (balls[containerIndex].length < 4) {
            selectedBall.x = container.x; // Update ball's position
            selectedBall.y =
              container.y +
              containerHeight / 2 -
              ball_diameter / 2 -
              balls[containerIndex].length * ball_diameter;
            balls[containerIndex].push(selectedBall); // Add the ball to the new container
            selectedBall = null; // Reset selection
            selectedContainer = null;
            return;
          } 
          else {
            console.log("Container is full!"); // Optional feedback
          }
        }
      }

      // If no valid container is found, return the ball to its original container
      balls[selectedContainer].push(selectedBall);
      selectedBall = null;
      selectedContainer = null;
    }
  }
}

function gameWon(){
  for (let containerIndex in balls) {
    containerBalls = balls[containerIndex];
    if (containerBalls.length > 0) {
      let firstColor = containerBalls[0].colour; // Get the color of the first ball
      for (let ball of containerBalls) {
        if (ball.colour !== firstColor) {
          if (containerBalls.length !== 3){
            return false; // If any ball is of a different color, the game is not won
          }
        }
      }
    }
  }

  gameOver = true; // Set the gameOver flag to true
  textSize(42);
  fill(0);
  text("You Win!", width / 2, height / 2);
  return true; // All containers are sorted by color
}
