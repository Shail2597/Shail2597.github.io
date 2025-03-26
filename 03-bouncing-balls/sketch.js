//Bouncing Balls Object Demo

let ballArray = [];
let colors = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);
  for (let ball of ballArray) {
    moveBalls(ball);
    displayBalls(ball);
  }

}

function moveBalls(ball) {
  //teleport the ball
  teleeportBall(ball);
  // move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;
  
}

function displayBalls(ball) {
  noStroke();
  fill(255, 0, 0);
  circle(ball.x, ball.y, ball.diameter);
}


function spawnBall() {
  let someBall = {
    x: random(width),
    y: random(height),
    diameter: random(200, 300),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  ballArray.push(someBall);
}

function mousePressed() {
  spawnBall();
}

function teleeportBall(ball) {
  if (ball.x - ball.diameter/2   > width) {
    ball.x =  - ball.diameter/2;
  }
  else if (ball.x + ball.diameter/2 < 0) {
    ball.x = width + ball.diameter/2;
  }
  else if (ball.y - ball.diameter/2 > height) {
    ball.y =  - ball.diameter/2;
  }
  else if (ball.y + ball.diameter/2 < 0) {
    ball.y = height + ball.diameter/2;
  }
}
