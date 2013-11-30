function Game() {
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.AI = new AI(canvasWidth, canvasHeight);
  this.AI.init.ufos.attack();
};

Game.prototype.render = function(time) {
  AI.render.ufos.attack(time);
};

Game.prototype.draw = function(context) {
  AI.draw.ufos.attack(context);
};

Game.prototype.key_down = function(e) {
  // for (var i = 0; i < this.ufos.length; i++) {
  //   var ufo = this.ufos[i];
  //   switch (e.keyCode) {
  //     case 32:
  //       ufo.movement = "beaming";
  //       break;
  //     case 37:
  //       ufo.movement = "left";
  //       break;
  //     case 38:
  //       ufo.movement = "up";
  //       break;
  //     case 39:
  //       ufo.movement = "right";
  //       break;
  //     case 40:
  //       ufo.movement = "down";
  //       break;
  //   }
  // }
};

Game.prototype.key_up = function(e) {
  // for (var i = 0; i < this.ufos.length; i++) {
  //   switch(e.keyCode) {
  //     case 32:
  //     case 37:
  //     case 38:
  //     case 39:
  //     case 40:
  //       this.ufos[i].movement = "still";
  //       break;
  //   }
  // }
};

Game.prototype.key_press = function(e) {
};
