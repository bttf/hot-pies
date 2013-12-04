function Game() {
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.AI = new AI(canvasWidth, canvasHeight);
  this.AI.init.ufos();
  this.AI.init.cows();
};

Game.prototype.render = function(time) {
  this.AI.render.ufos(time);
  this.AI.render.cows(time);
};

Game.prototype.draw = function(context) {
  this.AI.draw.cows(context);
  this.AI.draw.ufos(context);
};

Game.prototype.key_down = function(e) {
  // switch (e.keyCode) {
  //   case 32:
  //     this.cow.movement = "beaming";
  //     break;
  //   case 37:
  //     if (this.cow.movement === "up") 
  //       this.cow.movement = "up-left";
  //     else
  //       this.cow.movement = "left";
  //     break;
  //   case 38:
  //     if (this.cow.movement === "left")
  //       this.cow.movement = "up-left";
  //     else if (this.cow.movement === "right")
  //       this.cow.movement = "up-right";
  //     else
  //       this.cow.movement = "up";
  //     break;
  //   case 39:
  //     if (this.cow.movement === "up")
  //       this.cow.movement = "up-right";
  //     else
  //       this.cow.movement = "right";
  //     break;
  //   case 40:
  //     this.cow.movement = "down";
  //     break;
  // }
};

Game.prototype.key_up = function(e) {
  // switch(e.keyCode) {
  //   case 32:
  //   case 37:
  //   case 38:
  //   case 39:
  //   case 40:
  //     this.cow.movement = "still";
  //     break;
  // }
};

Game.prototype.key_press = function(e) {
};
