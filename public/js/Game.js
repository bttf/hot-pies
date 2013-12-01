function Game() {
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.AI = new AI(canvasWidth, canvasHeight);
  this.AI.init.ufos.attack();
  this.cow = new Cow(255, (canvasHeight - 50));
};

Game.prototype.render = function(time) {
  this.AI.render.ufos.attack(time);
  this.cow.render(time);
};

Game.prototype.draw = function(context) {
  this.cow.draw(context);
  this.AI.draw.ufos.attack(context);
};

Game.prototype.key_down = function(e) {
  switch (e.keyCode) {
    case 32:
      this.cow.movement = "beaming";
      break;
    case 37:
      this.cow.movement = "left";
      break;
    case 38:
      this.cow.movement = "up";
      break;
    case 39:
      this.cow.movement = "right";
      break;
    case 40:
      this.cow.movement = "down";
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
      this.cow.movement = "still";
      break;
  }
};

Game.prototype.key_press = function(e) {
};
