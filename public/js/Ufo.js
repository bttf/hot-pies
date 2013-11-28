function Ufo() {
  var assets = ['img/ufo1.png',
                'img/ufo2.png'];

  this.x = 0;
  this.y = 0;

  this.fps = 1000/6;

  this.frame = 0;
  this.frames = [];

  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
    this.frames[i].onload = this.onImageLoad;
  }
}

Ufo.prototype.onImageLoad = function() {
  console.log('debug: onImageLoad function called');
};
