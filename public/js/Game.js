function Game() {
  this.cows = [];
  this.ufos = [];
  this.lineSight = {};

  this.lastTick = 0;
  this.cowDelay = 2000;

  this.music = new Audio('audio/giltrythall.ogg');
  this.music.preload = "auto";

  this.muteAudio = 'true';
}

Game.prototype.init = function(canvas) {
  if (!this.muteAudio)
    this.music.play();

  this.canvas = canvas;
  this.shotgun = new ShotGun();
  this.farmerJohn = new FarmerJohn(canvas);
  this.lineSight = new LineSight(canvas, this.farmerJohn);
  this.background = new Background(canvas);
  this.ufoAi = new UfoAi(canvas);
};

Game.prototype.render = function(time) {
  if (time > this.lastTick + this.cowDelay) {
    var lastCow;
    this.cows.push(new Cow(this.canvas));
    lastCow = this.cows.length - 1;
    this.lastTick = time;
  }
  if (this.cows.length > 0) 
    this.ufoAi.generateUfos(this.ufos, this.cows, time);
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
  this.cows.forEach(function(cow, index, cows) {
    cow.draw(context);
  });
  this.farmerJohn.draw(context);
  this.ufos.forEach(function(ufo, index, ufos) {
    ufo.draw(context);
  });

  // debug
  context.fillStyle = "red";
  context.font = "bold 16px Georgia";
  context.fillText("ufoDelay: " + this.ufoAi.ufoDelay, 100, 100);
};

Game.prototype.key_down = function(e) {
  if (e.keyCode == 85) {
    this.ufos.push(new Ufo(this.canvas, this.cows[0]));
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

