class Pendulum {

  constructor(x, y, r, g) {
    this.origin = createVector(x, y);
    this.position = createVector();
    this.r = r;
    this.angle = 15*PI/180;
this.gravity = g/10; // Arbitrary constant
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995; // Arbitrary damping
    this.ballr = 48.0; // Arbitrary ball radius

    this.dragging = false;
  }
  update() {
    
     if(this.angle>(15*PI)/180) {
         //console.log("in");
      //   this.dragging=false;
    this.angle=(15*PI)/180;
  }
     if(this.angle<-(15*PI)/180) {
         //console.log("in");
         //this.dragging=false;
    this.angle=-(15*PI)/180;
  }
      if (!this.dragging) {
      
      this.aAcceleration = (-1 * this.gravity / this.r) * sin(this.angle); // Calculate acceleration 
      this.aVelocity += this.aAcceleration; // Increment velocity
    //  this.aVelocity *= this.damping; // Arbitrary damping
      this.angle += this.aVelocity; // Increment angle
    }
  }

  display() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0); // Polar to cartesian conversion
   
    this.position.add(this.origin); // Make sure the position is relative to the pendulum's origin

    stroke(255);
    strokeWeight(2);
  //  print(dist(this.origin.x, this.origin.y, this.position.x, this.position.y))
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(127);
    if (this.dragging){ 
      fill(200, 200, 225)}
   
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  }


  // Mouse interaction

  // This checks to see if we clicked on the pendulum ball
  clicked(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.ballr) {
      this.dragging = true;
    }
  }

      // This tells us we are not longer clicking on the ball
  stopDragging() {
    this.aVelocity = 0; // No velocity once you let go
    this.dragging = false;
  }

  drag() {
        // If we are draging the ball, we calculate the angle between the pendulum origin and mouse position
        // we assign that angle to the pendulum
    if (this.dragging) {
      let diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY)); 
        // Difference between 2 points
      this.angle = atan2(-1 * diff.y, diff.x) - radians(90); 
        // Angle relative to vertical axis
    }
  }
}