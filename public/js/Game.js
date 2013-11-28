function Game() {
  this.ufo = new Ufo();
  this.lastTick = 0;
}

Game.prototype.init = function() {
  //console.log('debug: init function called');
};

Game.prototype.render = function(time) {
  //console.log('debug: render function called');

  var ufo = this.ufo;
  if (time > (this.lastTick + ufo.fps)) {
    ufo.frame = (ufo.frame + 1) % ufo.frames.length;
    this.lastTick = time;
  }
  switch(ufo.movement) {
    case "up":
      ufo.y -= ufo.speed;
      break;
    case "down":
      ufo.y += ufo.speed;
      break;
    case "left":
      ufo.x -= ufo.speed;
      break;
    case "right":
      ufo.x += ufo.speed;
      break;
  }
};

Game.prototype.draw = function(context, time) {
  //console.log('debug: draw function called');

  var ufo = this.ufo;
  context.drawImage(ufo.frames[ufo.frame], ufo.x, ufo.y);
};

Game.prototype.key_down = function(e) {
  var ufo = this.ufo;
  switch (e.keyCode) {
    case 37:
      ufo.movement = "left";
      break;
    case 38:
      ufo.movement = "up";
      break;
    case 39:
      ufo.movement = "right";
      break;
    case 40:
      ufo.movement = "down";
      break;
  }
};

Game.prototype.key_up = function(e) {
  switch(e.keyCode) {
    case 37:
    case 38:
    case 39:
    case 40:
      this.ufo.movement = "still";
      break;
  }
};

Game.prototype.key_press = function(e) {
};
