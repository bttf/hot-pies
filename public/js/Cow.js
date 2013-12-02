function Cow(x = 0, y = 0, target_x = 0, target_y = 0) {
  var assets = ['img/cow1_left.png',
                'img/cow2_left.png',
                'img/cow1_right.png',
                'img/cow2_right.png'];

  this.x = x;
  this.y = y;

  this.target_x = target_x;
  this.target_y = target_y;

  this.movement = "still";
  this.speed = 5;

  this.frame = 0;
  this.frames = [];

  this.lastTick = 0;
  this.fps = 1000/5;

  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}

Cow.prototype.render = function(time) {
  switch (this.movement) {
    case "still":
      break;
    case "up-left":
      if (this.delayTickHasPassed(time)) {
        this.x -= (this.speed);
        this.y -= (this.speed);
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "up-right":
      if (this.delayTickHasPassed(time)) {
        this.x += (this.speed);
        this.y -= (this.speed);
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "up":
      if (this.delayTickHasPassed(time)) {
        this.y -= this.speed;
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "left":
      if (this.delayTickHasPassed(time)) {
        this.x -= this.speed;
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "right":
      if (this.delayTickHasPassed(time)) {
        this.x += this.speed;
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "beaming":
      this.y -= 2;
      break;
  }
};

Cow.prototype.draw = function(context) {
  context.drawImage(this.frames[this.frame], this.x, this.y);
};

Cow.prototype.delayTickHasPassed = function(time) {
  if (time > this.lastTick + this.fps) {
    return true;
  }
  return false;
};

Cow.prototype.updateFrame = function() {
  switch (this.movement) {
    case "left":
      this.frame = (this.frame + 1) % 2;
      break;
    case "right":
      this.frame = (((this.frame % 2) + 1) % 2) + 2;
      break;
    default:
      if (this.frame == 2 || this.frame == 3) {
        this.frame = (((this.frame % 2) + 1) % 2) + 2;
      }
      else {
        this.frame = (this.frame + 1) % 2;
      }
      break;
  }
};
