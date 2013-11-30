function Ufo(x = 0, y = 0) {
  var assets = ['img/ufo1.png',
                'img/ufo2.png'];

  this.ufoBeam = new UfoBeam();

  this.x = x;
  this.y = y;

  this.fps = 1000/6;
  this.movement = "still";
  this.tilt = 0;
  this.speed = 5;

  this.frame = 0;
  this.frames = [];

  this.lastTick = 0;

  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
    this.frames[i].onload = this.onImageLoad;
  }
}

Ufo.prototype.onImageLoad = function() {
  //console.log('debug: onImageLoad function called');
};

Ufo.prototype.render = function(time) {
  if (time > (this.lastTick + this.fps)) {
    this.frame = (this.frame + 1) % this.frames.length;
    this.lastTick = time;
  }

  switch(this.movement) {
    case "up":
      this.y -= this.speed;
      break;
    case "down":
      this.y += this.speed;
      break;
    case "left":
      this.tilt = -20;
      this.x -= this.speed;
      break;
    case "right":
      this.tilt = 20;
      this.x += this.speed;
      break;
    case "still":
      this.ufoBeam.reset();
      this.tilt = 0;
      break;
    case "beaming":
      this.ufoBeam.render(time, this);
      break;
  }
};

Ufo.prototype.draw = function(context) {
  if (this.tilt != 0 && this.movement != "beaming") { 
    drawRotatedImage(context, this.frames[this.frame], this.x, this.y, this.tilt);
  }
  else {
    context.drawImage(this.frames[this.frame], this.x, this.y);
  }

  if (this.movement === "beaming") {
    this.ufoBeam.draw(context, this);
  }
};

function drawRotatedImage(context, image, x, y, angle) {
  // Credit to Seb Lee-Delisle
  // http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
  var TO_RADIANS = Math.PI/180; 
  context.save(); 
  context.translate(x, y);
  context.rotate(angle * TO_RADIANS);
  context.drawImage(image, -(image.width/2), -(image.height/2));
  context.restore(); 
};
