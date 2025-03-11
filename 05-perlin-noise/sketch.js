// Perlin Noise Demo

let x,y;
let time = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(255);
  x = noise(time)*width;
  y = noise(time+100)*height;
  fill(0);
  circle(x,y, 50);
  time += 0.01;
}
