// Traffic Light Starter Code
// shail Chaudhari
// 27 February 2025

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

const LIGHTDURATIONYELLOW = 3000;
const LIGHTDURATIONRED = 9000;
const LIGHTDURATIONGREEN = 9000;
let lastLightChange = 0;
let light = "red";
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeLight();
  console.log(light);
  showLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
function changeLight() {
  if (light === "red" && millis() > lastLightChange + LIGHTDURATIONRED) {
    light = "green";
    lastLightChange = millis();
  }
  else if (light === "green" && millis() > lastLightChange + LIGHTDURATIONGREEN) {
    light = "yellow";
    lastLightChange = millis();
  }
  else if(light === "yellow" && millis() > lastLightChange + LIGHTDURATIONYELLOW) {
    light = "red";
    lastLightChange = millis(); 
  }
}
function showLight() {
  if (light === "red") {
    fill(204,50,50);
    ellipse(width/2, height/2 - 65, 50, 50);
  }
  else if (light === "green") {
    fill(45,201,55);
    ellipse(width/2, height/2 + 65, 50, 50);
  }
  else if (light === "yellow") {
    fill(231,180,22);
    ellipse(width/2, height/2, 50, 50);
  }
}
function windowResized() { 
  resizeCanvas(windowWidth, windowHeight);
}