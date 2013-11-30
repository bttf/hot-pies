function Game() {
  this.ufo = new Ufo();
  this.cow = new Cow(255, 200);
}

Game.prototype.init = function() {
};

Game.prototype.render = function(time) {
  this.ufo.render(time);
  this.cow.render(time);
};

Game.prototype.draw = function(context) {
  this.ufo.draw(context);
  this.cow.draw(context);
};

Game.prototype.key_down = function(e) {
  var ufo = this.ufo;
  switch (e.keyCode) {
    case 32:
      ufo.movement = "beaming";
      break;
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
    case 32:
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
