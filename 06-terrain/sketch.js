// Terrain Generation

let terrain = [];
const NUMBER_OF_RECTS = 2000;


function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain(width/NUMBER_OF_RECTS);
}

function draw() {
  background(220);
  stroke('green');
  fill('green');
  for (let someRect of terrain){
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function generateTerrain(rectWidth){
  let time = 0;
  let deltaTime = 0.001;  
  for (let x = 0; x < width; x+= rectWidth){
    let theHeight = noise(time) * height;
    let someRect = spawnRect(x, theHeight, rectWidth);
    terrain.push(someRect);
    time += deltaTime;
  }

}

function spawnRect(leftSide, rectheight, rectwidth){
  let theRect = {
    x: leftSide,
    y: height - rectheight,
    w: rectwidth,
    h: rectheight
  };
  return theRect;
}
