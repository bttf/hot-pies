function Game() {
  this.cows = [];
  this.ufos = [];
  this.lineSight = {};
  this.canvasWidth;
  this.canvasHeight;

  this.lastTick = 0;
  this.cowDelay = 2000;

  this.playMusic = false;
  this.music = new Audio('audio/giltrythall.ogg');
  this.music.preload = "auto";
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  if (this.playMusic)
    this.music.play();

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.shotgun = new ShotGun();
  this.farmerJohn = new FarmerJohn(canvasWidth, canvasHeight);
  this.lineSight = new LineSight(canvasWidth, canvasHeight, this.farmerJohn);
  this.background = new Background(canvasWidth, canvasHeight);
};

Game.prototype.render = function(time) {
  if (time > this.lastTick + this.cowDelay) {
    var lastCow;
    this.cows.push(new Cow(this.canvasWidth, this.canvasHeight));
    lastCow = this.cows.length - 1;
    this.ufos.push(new Ufo(this.canvasWidth, this.canvasHeight, this.cows[lastCow]));
    this.lastTick = time;
  }
  this.background.render(time);
  this.cows.forEach(function(cow, index, cows) {
    cow.render(time);
  });
  this.ufos.forEach(function(ufo, index, ufos) {
    ufo.render(time);
  });
  this.farmerJohn.render(time);
  this.lineSight.render(time);
};

Game.prototype.draw = function(context) {
  this.background.draw(context);
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
  if (e.keyCode == 85) {
    this.ufos.push(new Ufo(this.canvasWidth, this.canvasHeight, this.cows[0]));
  }
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
    if (this.lineSight.doesIntersect(this.ufos[i])) {
      if (this.ufos[i].x > maxX) {
        maxX = this.ufos[i].x;
        index = i;
      }
    }
  }
  if (typeof index !== "undefined")
    return this.ufos[index];
  else
    return false;
};

