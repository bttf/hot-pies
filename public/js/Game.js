function Game() {
  this.cows = [];
  this.ufos = [];
  this.canvasWidth;
  this.canvasHeight;
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.cows.push(new Cow(canvasWidth, canvasHeight));
  this.ufos.push(new Ufo(this.cows[0], canvasWidth, canvasHeight));
};

Game.prototype.render = function(time) {
  this.cows.forEach(function(cow, index, cows) {
    cow.render(time);
  });

  this.ufos.forEach(function(ufo, index, ufos) {
    ufo.render(time);
  });
};

Game.prototype.draw = function(context) {
  this.cows.forEach(function(cow, index, cows) {
    cow.draw(context);
  });

  this.ufos.forEach(function(ufo, index, ufos) {
    ufo.draw(context);
  });
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
