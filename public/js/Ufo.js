function Ufo(canvas, targetCow) {
  this.canvas = canvas;

  var assets = ['img/ufo1.png',
                'img/ufo2.png',
                'img/ufo3.png',
                'img/ufo4.png',
                'img/ufo5.png',
                'img/ufo6.png'];
  var explosionAssets = ['audio/explosion1.ogg',
                         'audio/explosion2.ogg',
                         'audio/explosion3.ogg',
                         'audio/explosion4.ogg',
                         'audio/explosion5.ogg'];

  this.muteAudio = false;

  this.ufoBeam = new UfoBeam(targetCow.target_y);
  this.beamDelay = 500;
  this.beamTick = 0;

  this.x = this.initX(canvas.width);
  this.y = this.initY(canvas.height);

  this.explosionSfx = [];
  for (var i = 0; i < explosionAssets.length; i++) {
    this.explosionSfx.push(new Audio(explosionAssets[i]));
    this.explosionSfx[i].preload = "auto";
  }
  this.explosionPlayed = false;
  this.explodeTick = 0;
  this.explodeDelay = 250;
  this.exploding = false;
  this.explodingFps = 1000/7;

  this.fps = 1000/6;
  this.movement = "still";
  this.tilt = 0;
  this.speed = 5;
  this.targetCow = targetCow;

  this.frame = 0;
  this.frames = [];

  this.lastTick = 0;

  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}

Ufo.prototype.render = function(time) {
  this.updateFrame(time);
  if (this.movement === "exploding") {
    this.moveExplodingUfo(time);
    if (this.prevMovement === "beaming")
      this.targetCow.drop();
  }
  else {
    this.setMovementBasedOnCow(time);
    this.moveUfo(time);
  }
};

Ufo.prototype.draw = function(context) {
  if (this.allImagesLoaded()) {
    if (this.tilt != 0 && this.movement != "beaming")  
      drawRotatedImage(context, this.frames[this.frame], this.x, this.y, this.tilt);
    else 
      context.drawImage(this.frames[this.frame], this.x, this.y);

    if (this.movement === "beaming") {
      this.ufoBeam.draw(context, this);
      this.targetCow.movement = "beaming";
    }
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

Ufo.prototype.updateFrame = function(time) {
  if (this.movement !== "exploding") {
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 2;
      this.lastTick = time;
    }
  }
  else {
    if (time > (this.lastTick + this.explodingFps)) {
      if (this.frame == this.frames.length - 1)
        this.hasExploded = true;
      if (this.frame < this.frames.length - 1) 
        this.frame++;
      this.lastTick = time;
    }
  }
};

Ufo.prototype.moveUfo = function(time) {
  switch(this.movement) {
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
}

Ufo.prototype.setMovementBasedOnCow = function(time) {
  if (this.targetCow.movement === "still" || this.targetCow.movement === "dropping") {
    var cow = this.targetCow;
    if (this.x > cow.x + 5) {
      this.movement = "left";
      this.beamTick = time;
    }
    else if (this.x < cow.x - 5) {
      this.movement = "right";
      this.beamTick = time;
    }
    else {
      if (this.beamTick !== 0 && time > this.beamTick + this.beamDelay) {
        this.movement = "beaming";
        this.targetCow.movement = "beaming";
      }
      else {
        this.movement = "still";
      }
    }
  }
};

Ufo.prototype.initX = function(canvasWidth) {
  var heads = Math.random() < 0.5 ? false : true;
  if (heads) {
    return  -(Math.floor(Math.random() * 100) + 150);
  }
  else {
    return (Math.floor(Math.random() * 100) + canvasWidth);
  }
};

Ufo.prototype.initY = function(canvasHeight) {
  return Math.floor(Math.random() * 200);
};

Ufo.prototype.explode = function() {
  this.explodeTick = this.lastTick + this.explodeDelay;
  this.prevMovement = this.movement;
  this.movement = "exploding";
  this.ufoBeam.reset();
};

Ufo.prototype.allImagesLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.frames.length; i++) {
    if (this.frames[i].complete != true) {
      allComplete = false;
    }
  }
  if (allComplete) {
    this.width = this.frames[0].width;
    this.height = this.frames[0].height;
  };
  return allComplete;
};

Ufo.prototype.moveExplodingUfo = function(time) {
  if (time > this.explodeTick) {
    if (!this.explosionPlayed && !this.muteAudio) {
      var index = Math.floor(Math.random() * this.explosionSfx.length);
      this.explosionSfx[index].play();
      this.explosionPlayed = true;
    }
  }
  switch (this.prevMovement) {
    case "left":
      this.x -= this.speed * 2;
      this.y += 2;
      break;
    case "right":
      this.x += this.speed * 2;
      this.y += 2;
      break;
    case "beaming":
    case "still":
      this.y += this.speed;
      break;
  }
};

