function FarmerJohn(canvas) {
  this.canvas = canvas; 

  var assets = ['img/farmerjohn1.png'];

  this.frames = [];
  this.frame = 0;

  this.x = canvas.width - 75;
  this.y = canvas.height - 138;

  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}

FarmerJohn.prototype.render = function(time) {
  this.frame = (this.frame + 1) % this.frames.length;
};

FarmerJohn.prototype.draw = function(context) {
  context.drawImage(this.frames[0], this.x, this.y);
};

