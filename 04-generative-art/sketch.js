// Project Title
// Your Name
// March 7, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const LINESIZE = 50;
let someLine;
let lineArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x<width; x+=LINESIZE){ 
    for (let y = 0 ; y<height; y+=LINESIZE){
      someLine = spawnLine(x, y,LINESIZE);
      lineArray.push(someLine);
    }
  }
}

function draw() {
  background(0);
  for (let line of lineArray){
    let red = random(255);
    let green = random(255);
    let blue = random(255);
    stroke(red, green, blue);
    strokeWeight(random(5));
    drawLine(line);

  }
}

function spawnLine(x,y, theSize){
  let theLine;
  let choice = random(100);
  if (choice < 50){
    // negative slope
    theLine = {
      x1: x-theSize/2,
      y1: y-theSize/2,
      x2: x+theSize/2,
      y2: y+theSize/2
    };
  }
  else{
    // positive slope
    theLine = {
      x1: x-theSize/2,
      y1: y+theSize/2,
      x2: x+theSize/2,
      y2: y-theSize/2
    };
  }
  return theLine;
}

function drawLine(theLine){
  line(theLine.x1, theLine.y1, theLine.x2, theLine.y2);
}