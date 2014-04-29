function Cow(canvasWidth, canvasHeight) {
  var assets = ['img/cow1_left.png',
                'img/cow2_left.png',
                'img/cow1_right.png',
                'img/cow2_right.png'];

  var x_padding = canvasWidth * .1;
  this.x = Math.floor((Math.random() * (canvasWidth - (x_padding * 2)) + x_padding));
  this.y = canvasHeight + Math.floor(Math.random() + 20);

  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  this.target_x = this.x + (plusOrMinus * 100);
  this.target_y = canvasHeight - (Math.floor(Math.random() * 100) + 46);

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
  if (this.movement === "beaming") {
    return;
  }
  
  if (this.x < this.target_x - 5) {
    if (this.y > this.target_y) {
      this.movement = "up-right";
    }
    else {
      this.movement = "right";
    }
  }
  else if (this.x > this.target_x + 5) {
    if (this.y > this.target_y) {
      this.movement = "up-left";
    }
    else {
      this.movement = "left";
    }
  }
  else if (this.y > this.target_y) {
    console.log('setDirection up');
    this.movement = "up";
  }
  else { 
    this.movement = "still";
  }
};

Cow.prototype.moveCow = function(time) {
  console.log('HERE');
  switch (this.movement) {
    case "still":
      console.log('still');
      break;
    case "up-left":
      console.log('upleft');
      if (this.delayTickHasPassed(time)) {
        this.x -= (this.speed);
        this.y -= (this.speed);
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "up-right":
      console.log('upright');
      if (this.delayTickHasPassed(time)) {
        this.x += (this.speed);
        this.y -= (this.speed);
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "up":
      console.log('up');
      if (this.delayTickHasPassed(time)) {
        this.y -= this.speed;
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "left":
      console.log('left');
      if (this.delayTickHasPassed(time)) {
        this.x -= this.speed;
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "right":
      console.log('right');
      if (this.delayTickHasPassed(time)) {
        this.x += this.speed;
        this.updateFrame();
        this.lastTick = time;
      }
      break;
    case "beaming":
      console.log('shit!');
      this.y -= 2;
      this.updateFrame();
      this.lastTick = time;
      break;
  }
};
