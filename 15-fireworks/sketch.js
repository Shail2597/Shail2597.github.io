//Fireworks OOP

const NUMBER_OF_FIREWORKS_PER_CLICK = 10000;
let theFireworks = [];

class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-20,20);
    this.dy = random(-20,20);
    this.diameter = 2;//random(15);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.b, this.b, this.opacity);
    circle(this.x, this.y, this.diameter); 
  }

  update(){
    //move
    this.x += this.dx;
    this.y += this.dy;

    //fade away over time
    this.opacity-=1;
  }

  isDead(){
    return this.opacity <= 0;
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for(let firework of theFireworks){
    if(firework.isDead()){
      //delete it
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }

    else{
      firework.update();
      firework.display();
    }
  }

}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++){
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}