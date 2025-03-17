// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i =0; i<10; i++){ 
    spawnBubble();
  }


  // spawn new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  for (let bubble of theBubbles){
    //randomize the movement
    bubble.dx = random(-5, 5);
    bubble.dy = random(-5, 5);
    // move the bubble
    bubble.x += bubble.dx;
    bubble.y += bubble.dy;
    // display the bubble
    fill(bubble.r, bubble.g, bubble.b);
    circle(bubble.x, bubble.y, bubble.radius*2);
  }
}

function spawnBubble(){
  let someBubble = {
    x: random(width),
    y: random(height),
    radius: random(40, 80),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  theBubbles.push(someBubble);
}