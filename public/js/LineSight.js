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
  if (x < this.x && y < this.y) {
    while (x > 0 && y > 0) {
      dx = this.x - x;
      dy = this.y - y;
      x -= dx / 50;
      y -= dy / 50;
    }
    this.mouseX = x;
    this.mouseY = y;
  }
};

LineSight.prototype.drawStitch = function(context) {
  var x1 = this.x;
  var y1 = this.y;
  var spacer = 55;
  var dx = (this.x - this.mouseX) / spacer;
  var dy = (this.y - this.mouseY) / spacer;
  var x2 = x1 - dx;
  var y2 = y1 - dy;
  var alternate = true;
  while (x2 > this.mouseX || y2 >= this.mouseY) {
    if (alternate) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(255, 0, 0, 1)';
      context.stroke();
      alternate = false;
    }
    else
      alternate = true;
    x1 = x2;
    y1 = y2;
    x2 = x1 - dx;
    y2 = y2 - dy;
  }
};
