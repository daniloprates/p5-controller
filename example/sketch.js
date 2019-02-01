var myp5Ctrl, cts;

function setup() {
  myp5Ctrl = new p5Controller('xypad');
  cts = myp5Ctrl.createControllers('xypad');
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(170);
  fill('#ED225D');
  noStroke();
  ellipse(
    cts[0].x, 
    cts[0].y, 
    cts[1].x, 
    cts[1].y
  );
}
