let contestants;

let canvasWidth = 500;
let canvasHeight = 500;

let amt = 200;

let rocks = amt;
let papers = amt;
let scissors = amt;

function preload() {
  // TODO works with gh pages :)
  // img = loadImage('assets/scroll.png');
}

function setup() {
  pixelDensity(1);
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
  for (let x = 0; x < contestants.length; x++) {
    contestants[x].move();
    contestants[x].show();
  }
}

class Contestant {  
  constructor(preyTypeId) {
    this.x = random(0 + 20, canvasWidth - 20);
    this.y = random(0 + 20, canvasHeight - 20);
    // 0 for rock, 1 for paper, 2 for scissors
    this.preyTypeId = preyTypeId;
    // this.isAlive = true;
  }
  
  closestPrey(enemyId) {
    // index in contestants | x pos | y pos | distance
    let prey = [-1, 0, 0, Number.MAX_SAFE_INTEGER]
      for (let x = 0; x < contestants.length; x++) {
        if (contestants[x].preyTypeId === enemyId) {
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

  // gets the type of prey for the current object
  getPreyType() {
    let preyID;
    // is rock
    if (this.preyTypeId === 0) {
      // prey is scissors
      preyID = 2;
    }
    // is paper
    else if (this.preyTypeId === 1) {
      // prey is rock
      preyID = 0;
    }
    // scissors
    else if (this.preyTypeId === 2) {
      // prey is paper
      preyID = 1;
    }
    return preyID;
  }

  move() {
    let preyID;
    preyID = this.getPreyType();

    // index in contestants | x pos | y pos | distance
    let prey = this.closestPrey(this.getPreyType());
    
    // run away from the predator
    let multiplier = 1;
    if (prey[0] === -1) {
      // console.log("GAME OVER");
      multiplier = -0.6;
    }
    // else {
      let preyX = prey[1];
      let preyY = prey[2];

      // move the predator
      let moveSpeed = 2;
      let randomMoveSpeedMultiplier = Math.floor(Math.random() * (1000 - 900) + 900) / 1000;
      console.log(randomMoveSpeedMultiplier)

      let boundsMultiplierX = 1;
      let boundsMultiplierY = 1;
      if (this.x > canvasWidth - 20 || this.x < 0 + 20) {
        boundsMultiplierX = boundsMultiplierX;
      }
      if (this.y > canvasHeight - 20 || this.y < 0 + 20) {
        boundsMultiplierY = boundsMultiplierY;
      }
      this.x = this.x + (Math.sign(preyX - this.x) * moveSpeed * multiplier * randomMoveSpeedMultiplier * boundsMultiplierX);
      this.y = this.y + (Math.sign(preyY - this.y) * moveSpeed * multiplier * randomMoveSpeedMultiplier * boundsMultiplierY);

      prey = this.closestPrey(preyID);
      let preyIndex = prey[0];
      let preyDistance = prey[3];
      if (preyDistance < 5) {
        contestants[preyIndex].preyTypeId = this.preyTypeId;
      }
      // this.x = this.x + random(-5, 5);
      // this.y = this.y + random(-5, 5);
    // }
  }

  show() {
    if (this.preyTypeId === 0) {
      stroke(255);
      strokeWeight(4);
      // noFill();
      fill(150)
      ellipse(this.x, this.y, 24, 24);
    }
    else if (this.preyTypeId === 1) {
      stroke(200);
      strokeWeight(4);
      // noFill();
      fill(240)
      rect(this.x, this.y, 20, 24);
    }
    // 2 is scissors
    else if (this.preyTypeId === 2) {
      stroke(200);
      strokeWeight(4);
      // noFill();
      fill('red')
      // ellipse(this.x, this.y, 24, 24);
      textSize(32);
      textAlign(LEFT, TOP);
      text('X', this.x, this.y);
    }
    // textSize(10);
    // textAlign(LEFT, TOP);
    // text(this.x + ', ' + this.y, this.x, this.y);

  }
}