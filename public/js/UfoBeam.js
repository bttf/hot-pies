function UfoBeam() {
  var beam_png = 'img/ufo_beam.png';
  this.is_beaming = false;
  this.beam_fps = 1000/2;
  this.beam_tick = 0;
  this.beam_count = 0;
  this.beam = new Image();
  this.beam.src = beam_png;
  this.beam_target_y = 1000;
  this.beam_x = 0;
  this.beam_y = 0;

  this.render = function(time, ufo) {
    this.beam_x = (ufo.x + (ufo.frames[ufo.frame].width / 4));
    this.beam_y = (ufo.y + (ufo.frames[ufo.frame].height));
    if (time > (this.beam_tick + this.beam_fps)) {
      if (this.beam_count * this.beam.height + this.beam_y < this.beam_target_y) {
        this.beam_count++;
        this.beam_tick = time;
      }
    }
  };

  this.draw = function(context, ufo) {
    for (var i = 0; i < this.beam_count; i++) {
      context.drawImage(this.beam, this.beam_x, ((ufo.y + ufo.frames[ufo.frame].height) + (i * this.beam.height)));
    }
  };

  this.reset = function() {
    this.beam_count = 0;
  };
};
