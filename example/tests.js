 // declare the variables
  var p5ct, // p5-controller instance
      ct; // your controllers

  var size;

  function setup() {
    size = 300;

    // Create a p5-controller instance:
    p5ct = new p5Controller('position','tr');

    // Create your controller
    ct = p5ct.createController('xypad');

    createCanvas(size, size);
  }

  function draw() {
    // now you can use the `ct.x` and `ct.y` variables
    fill(map(ct.x, 0, size, 0, 255));
    stroke(map(ct.y, 0, size, 255, 0));
    ellipse(
      size / 2,
      size / 2,
      ct.x,
      ct.y
    );
  }
