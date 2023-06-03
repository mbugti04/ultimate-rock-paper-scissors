let contestants;

let canvasWidth = 400;
let canvasHeight = 600;

let rocks = 5;
let papers = 5;
let scissors = 5;

function preload() {
  // img = loadImage('assets/scroll.png');
}

function setup() {
  frameRate(15);
  createCanvas(canvasWidth, canvasHeight);
  contestants = [];
  for (let x = 0; x < rocks; x++) {
      contestants.push(new Contestant(0));
  }
  for (let x = 0; x < papers; x++) {
    contestants.push(new Contestant(1));
  }
  for (let x = 0; x < scissors; x++) {
    contestants.push(new Contestant(2));
  }
  // image(img, 0, 0);
}

function draw() {
  background(220);
  for (let x = 0; x < 15; x++) {
    contestants[x].move();
    contestants[x].show();
  }
}

class Contestant {  
  constructor(id) {
    this.x = random(0 + 20, canvasWidth - 20);
    this.y = random(0 + 20, canvasHeight - 20);
    this.id = id;
    this.isAlive = true;
  }
  
  closestPrey(enemyId) {
    // index in contestants | x pos | y pos | distance
    let prey = [0, 0, 0, Number.MAX_SAFE_INTEGER]
      for (let x = 0; x < 15; x++) {
        if (contestants[x].id === enemyId) {
          let c = contestants[x];
          let d = this.distance(this.x, this.y, c.x, c.y);
          if (d < prey[3]) {
            prey = [x, c.x, c.y, d]
          }
        }
      }
    return prey;
  }
  
  // distance formula
  distance(thisX, thisY, otherX, otherY) {
    let diffX = thisX - otherX;
    let diffY = thisY - otherY;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  }

  move() {
    let preyID;
    // is rock
    if (this.id === 0) {
      // prey is scissors
      preyID = 2;
    }
    // is paper
    else if (this.id === 1) {
      // prey is rock
      preyID = 0;
    }
    // scissors
    else if (this.id === 2) {
      // prey is paper
      preyID = 1;
    }

    // index in contestants | x pos | y pos | distance
    let prey = this.closestPrey(preyID);
    let preyX = prey[1];
    let preyY = prey[2];

    // move the predator
    let moveSpeed = 2;

    this.x = this.x + (Math.sign(preyX - this.x) * moveSpeed);
    this.y = this.y + (Math.sign(preyY - this.y) * moveSpeed);
    // this.x = this.x + random(-5, 5);
    // this.y = this.y + random(-5, 5);
  }

  show() {
    if (this.id === 0) {
      stroke(255);
      strokeWeight(4);
      // noFill();
      fill(150)
      ellipse(this.x, this.y, 24, 24);
    }
    else if (this.id === 1) {
      stroke(200);
      strokeWeight(4);
      // noFill();
      fill(240)
      rect(this.x, this.y, 20, 24);
    }
    // 2 is scissors
    else if (this.id === 2) {
      stroke(200);
      strokeWeight(4);
      // noFill();
      fill('red')
      // ellipse(this.x, this.y, 24, 24);
      textSize(32);
      textAlign(LEFT, TOP);
      text('X', this.x, this.y);
    }
    textSize(10);
    textAlign(LEFT, TOP);
    text(this.x + ', ' + this.y, this.x, this.y);

  }
}