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
let selectedBall = null;
let selectedContainer = null;
let gameOver = false;

// Variables for video input and hand tracking
let videoCanvas, gameCanvas, video, handPose, hands = [];
let painting, px = 0, py = 0;

function preload() {
  // Initialize HandPose model
  handPose = ml5.handPose(); 
}

function gotHands(results) {
  // Update detected hands
  hands = results;
}

function setup() {
  // Display game instructions as prompts
  alert("Welcome to the Ball Sort Game!");
  alert(
    "Instructions:\n" +
    "- The goal is to sort all the balls in the containers by color.\n" +
    "- You can interact with the game using either the mouse or hand gestures:\n" +
    "  * Mouse: Click on a ball to pick it up, then click on a container to drop it.\n" +
    "  * Hand Gestures: Pinch your fingers to pick up a ball, and release the pinch to drop it.\n" +
    "- A container can hold a maximum of 4 balls.\n" +
    "- If you make a mistake, the ball will return to its original container.\n" +
    "- The game ends when all containers are sorted by color.\n" +
    "Good luck!"
  );
  // Create canvas and game canvas(buffer graphics)
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
  // Display the video feed
  image(video, 0, 0, width, height);
  handPose.detect(video, gotHands);
  // Draw the game elements on the buffer graphics
  drawHeading();
  drawContainers();
  drawBalls();

  //Handle finger touch for painting, which will draw on top
  fingerTouch();

  // Display the game canvas
  image(gameCanvas, 0, 0);
}

function drawHeading() {
  // Draw the heading at the top of the canvas
  gameCanvas.textSize(48);
  gameCanvas.fill(0); // Black text
  gameCanvas.textAlign(CENTER, CENTER);
  gameCanvas.text("Ball Sort Game", width / 2, 50); // Centered heading
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
    gameCanvas.rect(container.x, container.y, container.width, container.height, 25);
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
        colour: shuffledColours[j], 
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
  // Prevent interaction if the game is over
  if (gameOver) {
    return; 
  }

  if (selectedBall === null) {
    // Select a ball if none is currently selected
    for (let containerIndex in balls) {
      containerBalls = balls[containerIndex];
      if (containerBalls.length > 0) {
        let topBall = containerBalls[containerBalls.length - 1]; // Get the topmost ball
        let distance = dist(mouseX, mouseY, topBall.x, topBall.y); // Calculate distance to mouse
        if (distance < ball_diameter / 2) {
          selectedBall = topBall; // Mark the ball as selected
          selectedContainer = containerIndex; // Store its container
          balls[containerIndex].pop();
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
          selectedBall.y = container.y + containerHeight / 2 - ball_diameter / 2 - balls[containerIndex].length * ball_diameter; 
          balls[containerIndex].push(selectedBall); 
          selectedBall = null; 
          selectedContainer = null; 
          if (gameWon()) {
            console.log("Game won!");
          }
          return;
        }
        else {
          console.log("Container is full!");
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
  // Prevent interaction if the game is over
  if (gameOver) {
    return; 
  }

  if (hands.length > 0) {
    let hand = hands[0]; // Get the first detected hand
    let index = hand.index_finger_tip; // Index finger tip position
    let thumb = hand.thumb_tip; // Thumb tip position

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
            selectedBall.y = container.y + containerHeight / 2 - ball_diameter / 2 - balls[containerIndex].length * ball_diameter; 
            balls[containerIndex].push(selectedBall); 
            selectedBall = null; 
            selectedContainer = null; 
            if (gameWon()) {
              console.log("Game won!");
            }
            return;
          } 
          else {
            console.log("Container is full!"); 
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

function gameWon() {
  // Check if all containers are sorted by color
  for (let containerIndex in balls) {
    containerBalls = balls[containerIndex];
    if (containerBalls.length > 0) {
      let firstColor = containerBalls[0].colour; // Get the color of the first ball
      for (let ball of containerBalls) {
        if (ball.colour !== firstColor) {
          return false; // If any ball is of a different color, the game is not won
        }
      }
    }
  }

  gameOver = true;
  displayWinScreen();
  return true;
}

function displayWinScreen() {
  // Display "You Win!" message 
  gameCanvas.textSize(64);
  gameCanvas.fill(0); // Black text
  gameCanvas.textAlign(CENTER, CENTER);
  gameCanvas.text("You Win!", width / 2, height / 3);

  gameCanvas.textSize(24);
  gameCanvas.fill(100);
  gameCanvas.text("Refresh the page to play again!", width / 2, height / 3 + 50);

  // Add confetti effect
  for (let i = 0; i < 100; i++) {
    let x = random(width); // Random x position
    let y = random(height); // Random y position
    let size = random(5, 15); // Random size for confetti
    let color = color(random(255), random(255), random(255)); // Random color
    gameCanvas.fill(color);
    gameCanvas.noStroke();
    gameCanvas.ellipse(x, y, size); // Draw confetti as small circles
  }
}