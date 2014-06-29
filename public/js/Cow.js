function Cow(canvas) {
  this.canvas = canvas; 

  var assets = ['img/cow1_left.png',
                'img/cow2_left.png',
                'img/cow1_right.png',
                'img/cow2_right.png'];

  var x_padding = canvas.width * .1;
  this.x = Math.floor((Math.random() * (canvas.width - (x_padding * 2)) + x_padding));
  this.y = canvas.height + Math.floor(Math.random() + 20);

  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  this.target_x = this.x + (plusOrMinus * 100);
  this.target_y = canvas.height - (Math.floor(Math.random() * 100) + 46);

  this.movement = "still";
  this.speed = 5;

  this.frame = 0;
  this.frames = [];

  this.lastTick = 0;
  this.fps = 1000/5;

  this.dropping = false;

  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}

Cow.prototype.render = function(time) {
  this.setDirection();
  this.moveCow(time);
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
    case "up-left":
    case "left":
      this.frame = (this.frame + 1) % 2;
      break;
    case "up-right":
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

Cow.prototype.setDirection = function() {
  if (this.movement === "beaming" ||
      this.movement === "dropping") 
    return;
  
  if (this.x < this.target_x - 5) 
    if (this.y > this.target_y) 
      this.movement = "up-right";
    else 
      this.movement = "right";
  else if (this.x > this.target_x + 5) 
    if (this.y > this.target_y) 
      this.movement = "up-left";
    else 
      this.movement = "left";
  else if (this.y > this.target_y) 
    this.movement = "up";
  else  
    this.movement = "still";
};

Cow.prototype.moveCow = function(time) {
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
      this.updateFrame();
      this.lastTick = time;
      break;
    case "dropping":
      this.y += 2;
      this.updateFrame();
      this.lastTick = time;
      break;
  }
};

Cow.prototype.drop = function() {
  this.movement = "dropping";
};
