function Cow(x = 0, y = 0) {
  var assets = ['img/cow1.png',
                'img/cow2.png'];

  this.x = x;
  this.y = y;

  this.movement = "still";
  this.speed = 5;

  this.frame = 0;
  this.frames = [];

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
      this.x -= this.speed;
      break;
    case "right":
      this.x += this.speed;
      break;
    case "beaming":
      break;
  }
};

Cow.prototype.draw = function(context) {
  context.drawImage(this.frames[this.frame], this.x, this.y);
};
