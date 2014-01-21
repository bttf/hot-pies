describe("UfoBeam", function() {
  describe("contructor", function() {
    it ("should accept a param for targetY", function() {
      expect(UfoBeam.length).toEqual(1);
    });
    it ("should set beam_target_y to param value", function() {
      var x = 15;
      var ufoBeam = new UfoBeam(x);
      expect(ufoBeam.beam_target_y).toEqual(x);
    });
  });

  describe("rendering and drawing", function() {
    var ufoBeam = new UfoBeam();
    describe("render function", function() {
      it ("should have arity of 2 (time, ufo)", function() {
        expect(ufoBeam.render.length).toEqual(2);
      });
    });
    describe("draw function", function() {
      it ("should have an arity of 2 (context, ufo)", function() {
        expect(ufoBeam.draw.length).toEqual(2);
      });
    });
  });
  describe("reset function", function() {
  var ufoBeam = new UfoBeam();
    it ("should reset beam_count to zero", function() {
      ufoBeam.beam_count = 88;
      expect(ufoBeam.beam_count).toEqual(88);
      ufoBeam.reset();
      expect(ufoBeam.beam_count).toEqual(0);
    });
  });
  describe("stateful stuff", function() {
  var ufoBeam = new UfoBeam();
    it ("should have a 'is_beaming' flag", function() {
      expect(ufoBeam.is_beaming).toBeDefined();
    });
    it ("should have a 'beam_fps' to govern beam framerate", function() {
      expect(ufoBeam.beam_fps).toBeDefined();
    });
    it ("should have a 'beam' var that contains an image", function() {
      expect(Object.prototype.toString.call(ufoBeam.beam)).toBe("[object HTMLImageElement]");
    });
    it ("'beam_count' to pace beams; initialized at 0", function() {
      expect(ufoBeam.beam_count).toEqual(0);
    });
  });

});
