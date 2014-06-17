function LineSight(canvas, shooter) {
  this.canvas = canvas;

  this.mouseX = 0;
  this.mouseY = 0;

  this.shooter = shooter;

  this.x = canvas.width;
  this.y = canvas.height;
}

LineSight.prototype.render = function(time) {
  this.x = this.shooter.x + (this.shooter.frames[0].width / 2);
  this.y = this.shooter.y + 25;
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

LineSight.prototype.doesIntersect = function(obj) {
  var x = this.mouseX;
  var y = this.mouseY;

  if (typeof obj.x === "undefined" ||
      typeof obj.y === "undefined" ||
      typeof obj.width === "undefined" ||
      typeof obj.height === "undefined") {
    console.log('debug: obj is missing properties');
    return false;
  }

  while (x < this.x) {
    if (y > obj.y && x > obj.x
        && y < obj.y + obj.height
        && x < obj.x + obj.width) {
      console.log('you just hit obj at %d, %d', obj.x, obj.y);
      return true;
    }
    dx = this.x - this.mouseX;
    dy = this.y - this.mouseY;
    x += dx / 50;
    y += dy / 50;
  }
  return false;
};


