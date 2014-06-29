function UfoAi(canvas) {
  this.canvas = canvas;
  this.lastTick = 0;
  this.ufoDelay = 1500;
  this.ufoDelayDecay = 25;
  this.ufoDelayDecayCutoff = 500;
}

UfoAi.prototype.generateUfos = function(ufos, cows, time) {
  // find random cow index
  this.randCowIndex = Math.floor(Math.random() * cows.length);
  // add a new ufo
  if (time > this.lastTick + this.ufoDelay) {
    ufos.push(new Ufo(this.canvas, cows[this.randCowIndex]));
    this.lastTick = time;
    if (this.ufoDelay > this.ufoDelayDecayCutoff)
      this.ufoDelay -= this.ufoDelayDecay;
  }
  for (var i = 0; i < ufos.length; i++) {
    if (!ufos[i].targetCow) {
      this.randCowIndex = Math.floor(Math.random() * cows.length);
      ufos[i].targetCow = cows[this.randCowIndex];
    }
  }
};
