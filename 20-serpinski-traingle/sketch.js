// Serpinski Triangle
let initialTriangle;

let theDepth = 0; // Change this value to increase/decrease the depth of recursion

let theColors = [ "blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "magenta", "lime" ];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialTriangle = [
    { x: width/2, y: 50 },
    { x: 50, y: height - 50 },
    { x: width - 50, y: height - 50 }
  ];
  serpinski(initialTriangle, theDepth);
}

function draw() {
}

function serpinski(points, depth){
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  // Escape condition
  if (depth > 0) {
  // pattern ----> draw 3 new triangles
  
    // bottom left
    serpinski([
      middlePoint(points[0], points[1]),
      points[1],
      middlePoint(points[1], points[2])
    ], depth - 1);

    // bottom right
    serpinski([
      middlePoint(points[0], points[2]),
      middlePoint(points[1], points[2]),
      points[2]
    ], depth - 1);
    
    // top
    serpinski([
      points[0],
      middlePoint(points[0], points[1]),
      middlePoint(points[0], points[2])
    ], depth - 1);
  }
}

function middlePoint(p1, p2) {
  let midX = (p1.x + p2.x) / 2;
  let midY = (p1.y + p2.y) / 2;
  return { x: midX, y: midY };
}

function mousePressed() {
  if (theDepth < 9) {
    theDepth++;
    background(220);
    serpinski(initialTriangle, theDepth);
  }
}