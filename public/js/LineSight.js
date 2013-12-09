function LineSight(canvasWidth, canvasHeight) {
  this.x = canvasWidth;
  this.y = canvasHeight;
  this.mouse_x = 0;
  this.mouse_y = 0;
}

LineSight.prototype.draw = function(context) {
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.mouse_x, this.mouse_y);
  context.lineWidth = 1;
  context.strokeStyle = "#FF0000";
  context.stroke();
};
