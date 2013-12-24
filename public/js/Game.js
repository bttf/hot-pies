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
  this.ufos.push(new Ufo(canvasWidth, canvasHeight, this.cows[0]));
  this.shotgun = new ShotGun();
  this.farmerJohn = new FarmerJohn(canvasWidth, canvasHeight);
  this.lineSight = new LineSight(canvasWidth, canvasHeight, this.farmerJohn);
};

Game.prototype.render = function(time) {
  this.cows.forEach(function(cow, index, cows) {
    cow.render(time);
  });

  for (var i = 0; i < this.ufos.length; i++) {
    this.ufos[i].render(time);
  }

  this.farmerJohn.render(time);
  this.lineSight.render(time);
};

Game.prototype.draw = function(context) {
  this.lineSight.draw(context);
  this.farmerJohn.draw(context);
  this.cows.forEach(function(cow, index, cows) {
    cow.draw(context);
  });
  this.ufos.forEach(function(ufo, index, ufos) {
    ufo.draw(context);
  });
};

Game.prototype.key_down = function(e) {
  this.shotgun.key_down(e);
};

Game.prototype.key_up = function(e) {
};

Game.prototype.key_press = function(e) {
};

Game.prototype.mousemove = function(e) {
  this.lineSight.mousemove(e);
};

Game.prototype.mouse_down = function(e) {
  if (this.shotgun.isCocked) {
    var ufo;
    if (ufo = this.ufoHit()) {
      ufo.explode();
    }
  }
  this.shotgun.mouse_down(e);
};

Game.prototype.ufoHit = function() {
  var index;
  var maxX = 0;
  for (var i = 0; i < this.ufos.length; i++) {
    console.log(this.ufos[i]);
    if (this.lineSight.doesIntersect(this.ufos[i])) {
      if (this.ufos[i].x > maxX) {
        maxX = this.ufos[i].x;
        index = i;
        console.log('maxX %d', maxX);
      }
    }
  }
  if (typeof index !== "undefined")
    return this.ufos[index];
  else
    return false;
};

