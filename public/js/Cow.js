function Cow(x = 0, y = 0) {
  var assets = ['img/cow1_left.png',
                'img/cow2_left.png',
                'img/cow1_right.png',
                'img/cow2_right.png'];

  this.x = x;
  this.y = y;

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
    case "left":
      if (time > (this.lastTick + this.fps)) {
        this.x -= this.speed;
        this.frame = (this.frame + 1) % 2;
        this.lastTick = time;
      }
      break;
    case "right":
      if (time > (this.lastTick + this.fps)) {
        this.x += this.speed;
        this.frame = (((this.frame % 2) + 1) % 2) + 2;
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
