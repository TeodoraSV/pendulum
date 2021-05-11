let pendulum;
let slider;
let slider1;
var tx1;
var tx2;
function preload(){
  ph=loadImage("ph.jpg")
}

function setup() {
  createCanvas(640, 500);
  // Make a new Pendulum with an origin position and armlength
  slider=createSlider(9.51, 10.11,  9.81, 0.30)
  var l=createElement("p")
  var gr=slider.value()
  slider1=createSlider(40, 400,  400, 120)
  rr=slider1.value()
  tx1=createElement("p", "g = "+slider.value())
  tx2=createElement("p", "L = "+slider1.value()/400 + " m")
  pendulum = new Pendulum(width / 2, 0, rr, gr);
  
}

function draw() {
 pendulum.r=slider1.value()
  pendulum.g=slider.value()
tx1.html("g = "+slider.value())
  tx2.html("L = "+slider1.value()/400+ " m")
  background(ph);
  
 push()
  fill(0, 150)
  rect(0, 0, width, height)
 pop()
  
  pendulum.update();
  pendulum.drag(); // for user interaction
  pendulum.display();
  
 push()
  translate(width/2, 0)
  stroke(150)
  var l=line( pendulum.r * sin((15*PI)/180),  pendulum.r * cos((15*PI)/180), 0, 0);
  var l1=line( pendulum.r * sin(-(15*PI)/180),  pendulum.r * cos(-(15*PI)/180), 0, 0);
 pop()
}

function mousePressed() {
  pendulum.clicked(mouseX, mouseY);
}

function mouseReleased() {
  pendulum.stopDragging();
}
