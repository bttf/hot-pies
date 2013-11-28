function Ufo() {
  var assets = ['img/ufo1.png',
                'img/ufo2.png'];

  this.x = 0;
  this.y = 0;

  this.fps = 1000/6;

  this.movement = "still";

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
      this.x -= this.speed;
      break;
    case "right":
      this.x += this.speed;
      break;
  }
};

Ufo.prototype.draw = function(context) {
  context.drawImage(this.frames[this.frame], this.x, this.y);
};
