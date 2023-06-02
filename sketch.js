let img;

function preload() {
  img = loadImage('assets/scroll.png');
}

function setup() {
  frameRate(15);
  createCanvas(400, 400);
  image(img, 0, 0);
}

function draw() {
  background(220);
  console.log("hey")
}