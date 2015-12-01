function Background(canvas) {
  this.canvas = canvas;

  var assets = ['img/grass1.png',
                'img/sky1.png'];

  this.frames = [];
  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }

  this.foreground = this.frames[0];
  this.background = this.frames[1];
}

Background.prototype.render = function(time) {
};

Background.prototype.draw = function(context) {
  this.drawBg(context);
  this.drawFg(context);
};

Background.prototype.drawBg = function(context) {
  if (this.allImagesLoaded()) {
    var x = 0;
    var y = 0;
    var rightBound = this.canvas.width + (2 * this.background.width);
    var lowerBound = this.canvas.height + (this.background.height / 2);

    for (var i = y; i < lowerBound; i += this.background.height) {
      for (var j = x; j < rightBound; j += this.background.width) {
        context.drawImage(this.background, j, i);
      }
    }
  }
};

Background.prototype.drawFg = function(context) {
  if (this.allImagesLoaded()) {
    var x = 0;
    var y = this.canvas.height - (this.foreground.width / 2);
    var rightBound = this.canvas.width + this.foreground.width;
    var upperBound = this.canvas.height - (this.canvas.height / 4);

    for (var i = x; i < rightBound; i += this.foreground.width) {
      context.drawImage(this.foreground, i, y);
    }
  }
};

Background.prototype.allImagesLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.frames.length; i++) {
    if (this.frames[i].complete === false) {
      allComplete = false;
    }
  }
  return allComplete;
};
