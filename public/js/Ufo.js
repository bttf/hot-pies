function Ufo() {
  var assets = ['img/ufo1.png',
                'img/ufo2.png'];
  //var beam_png = 'img/ufo_beam.png';

  this.ufoBeam = new UfoBeam();

  this.x = 0;
  this.y = 0;

  this.fps = 1000/6;
  this.movement = "still";
  this.tilt = 0;
  this.speed = 5;

  this.frame = 0;
  this.frames = [];

  this.lastTick = 0;
  
  //this.is_beaming = false;
  //this.beam_fps = 1000/2;
  //this.beam_tick = 0;
  //this.beam_count = 0;
  //this.beam = new Image();
  //this.beam.src = beam_png;
  //this.beam_target_y = 1000;
  //this.beam_x = 0;
  //this.beam_y = 0;

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
    //for (var i = 0; i < this.beam_count; i++) {
      //context.drawImage(this.beam, this.beam_x, ((this.y + this.frames[this.frame].height) + (i * this.beam.height)));
    //}
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
