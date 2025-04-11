// OOP Walker Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let walkers = [];


class Walker {
  constructor(x, y, theColor){
    this.x = x;
    this.y = y;
    this.color= theColor;
    this.speed = 10;
    this.radius = 5;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, 2*this.radius);
  }

  move(){
    let choice = random(100);
    if (choice < 25){
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed;
    }
    else if (choice < 75){
      this.x -= this.speed;
    }
    else{
      this.x += this.speed;
    }
  }
}

let luke;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // luke = new Walker(width/2, height/2, "red");
  // shail = new Walker(200, 300, "blue");
  spawnWalker();
}

function draw() {

  // background(220);
  // luke.move();
  // luke.display();

  // shail.move();
  // shail.display();
}


function mousePressed(){
}

function spawnWalker(){

}