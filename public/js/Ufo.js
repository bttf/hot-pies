function Ufo(canvasWidth, canvasHeight, targetCow) {
  var assets = ['img/ufo1.png',
                'img/ufo2.png',
                'img/ufo3.png',
                'img/ufo4.png',
                'img/ufo5.png',
                'img/ufo6.png'];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.ufoBeam = new UfoBeam();

  this.x = this.initX(canvasWidth);
  this.y = this.initY(canvasHeight);

  this.explosionPlayed = false;
  this.explodeTick = 0;
  this.explodeDelay = 250;
  this.explosion = new Audio('audio/explosion.ogg');
  this.explosion.preload = "auto";
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
  if (this.exploding) {
    this.moveExplodingUfo(time);
  }
  else {
    this.setMovementBasedOnCow();
    this.moveUfo();
  }
};

Ufo.prototype.draw = function(context) {
  if (this.allImagesLoaded()) {
    if (this.tilt != 0 && this.movement != "beaming") { 
      drawRotatedImage(context, this.frames[this.frame], this.x, this.y, this.tilt);
    }
    else {
      context.drawImage(this.frames[this.frame], this.x, this.y);
    }

    if (this.movement === "beaming") {
      this.ufoBeam.draw(context, this);
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
  if (!this.exploding) {
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 2;
      this.lastTick = time;
    }
  }
  else {
    if (time > (this.lastTick + this.explodingFps)) {
      if (this.frame < 5) {
        this.frame++;
      }
      this.lastTick = time;
    }
  }
};

Ufo.prototype.moveUfo = function() {
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

Ufo.prototype.setMovementBasedOnCow = function() {
  if (this.targetCow.movement === "still") {
    var cow = this.targetCow;
    if (this.x > cow.x + 5) {
      this.movement = "left";
    }
    else if (this.x < cow.x - 5) {
      this.movement = "right";
    }
    else {
      this.movement = "still";
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
  this.exploding = true;
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
    if (!this.explosionPlayed) {
      this.explosion.play();
      this.explosionPlayed = true;
    }
  }
  switch (this.movement) {
    case "left":
      this.x -= this.speed * 2;
      this.y += 2;
      break;
    case "right":
      this.x += this.speed * 2;
      this.y += 2;
      break;
    case "still":
      this.y += this.speed;
      break;
  }
};
