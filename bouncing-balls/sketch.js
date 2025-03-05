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
    // display the ball
    fill('red');
    circle(ball.x, ball.y, ball.diameter);
    //teleport the ball
    teleeportBall(ball);
    // move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}

function spawnBall() {
  let someBall = {
    x: random(width),
    y: random(height),
    diameter: random(25, 100),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  ballArray.push(someBall);
}

function mousePressed() {
  spawnBall();
}

function teleeportBall(ball) {
  if (ball.x > width) {
    ball.x = 0;
  }
  if (ball.x < 0) {
    ball.x = width;
  }
  if (ball.y > height) {
    ball.y = 0;
  }
  if (ball.y < 0) {
    ball.y = height;
  }
}