function LineSight(canvasWidth, canvasHeight) {
  this.x = canvasWidth;
  this.y = canvasHeight;
  this.mouseX = 0;
  this.mouseY = 0;

  this.gapFreq = 10;
  this.gapLength = 5;
}

LineSight.prototype.render = function(time) {
};

LineSight.prototype.draw = function(context) {
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.mouseX, this.mouseY);
  context.lineWidth = 1;
  context.strokeStyle = "#FF0000";
  context.stroke();
};

LineSight.prototype.mousemove = function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var dx, dy;
  while (x > 0 && y > 0) {
    dx = this.x - x;
    dy = this.y - y;
    x -= dx;
    y -= dy;
  }
  this.mouseX = x;
  this.mouseY = y;
};
