function Game() {
  this.ufo = new Ufo();
  this.lastTick = 0;
}

Game.prototype.init = function() {
  console.log('debug: init function called');
};

Game.prototype.render = function(time) {
  console.log('debug: render function called');

  var ufo = this.ufo;
  if (time > (this.lastTick + ufo.fps)) {
    ufo.frame = (ufo.frame + 1) % ufo.frames.length;
    this.lastTick = time;
  }
};

Game.prototype.draw = function(context, time) {
  console.log('debug: draw function called');

  var ufo = this.ufo;
  context.drawImage(ufo.frames[ufo.frame], ufo.x, ufo.y);
};
