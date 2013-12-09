function Game() {
  this.cows = [];
  this.ufos = [];
  this.lineSight = {};
  this.canvasWidth;
  this.canvasHeight;
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.cows.push(new Cow(canvasWidth, canvasHeight));
  this.ufos.push(new Ufo(this.cows[0], canvasWidth, canvasHeight));
  this.lineSight = new LineSight(canvasWidth, canvasHeight);
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
  this.lineSight.draw(context);

  this.cows.forEach(function(cow, index, cows) {
    cow.draw(context);
  });

  this.ufos.forEach(function(ufo, index, ufos) {
    ufo.draw(context);
  });
};

Game.prototype.key_down = function(e) {
};

Game.prototype.key_up = function(e) {
};

Game.prototype.key_press = function(e) {
};
