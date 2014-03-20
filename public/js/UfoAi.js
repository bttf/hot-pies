function UfoAi() {
  this.lastTick = 0;
  this.ufoDelay = 1500;
  this.ufoDelayDecay = 50;
}

UfoAi.prototype.init = function(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
};

UfoAi.prototype.generateUfos = function(ufos, cows, time) {
  // find random cow index
  this.randCowIndex = Math.floor(Math.random() * cows.length);
  // add a new ufo
  if (time > this.lastTick + this.ufoDelay) {
    ufos.push(new Ufo(this.canvasWidth, this.canvasHeight, cows[this.randCowIndex]));
    this.lastTick = time;
    if (this.ufoDelay > 850)
      this.ufoDelay -= this.ufoDelayDecay;
  }
  for (var i = 0; i < ufos.length; i++) {
    if (!ufos[i].targetCow) {
      this.randCowIndex = Math.floor(Math.random() * cows.length);
      ufos[i].targetCow = cows[this.randCowIndex];
    }
  }
};
