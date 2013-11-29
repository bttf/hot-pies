describe("Ufo", function() {
  var ufo = new Ufo();

  describe("loading image assets", function() {
    it ("should have a 'frames' array", function() {
      expect(Object.prototype.toString.call(ufo.frames)).toBe("[object Array]");
    });

    it ("should have a 'frame' int", function() {
      expect(typeof ufo.frame).toBe("number");
    });
    
    it ("should have frames loaded with Images", function() {
      expect(ufo.frames.length).toBeGreaterThan(0);
      for (var i = 0; i < ufo.frames.length; i++) {
        expect(Object.prototype.toString.call(ufo.frames[i])).toBe("[object HTMLImageElement]");
      }
    });
  });

  describe ("rendering", function() {
    it ("should have a render function", function() {
      expect(typeof ufo.render).toBe('function');
    });
    it ("render should have an arity of one", function() {
      expect(ufo.render.length).toEqual(1);
    });
    it ("ufo class should maintain a lastTick var", function() {
      expect(ufo.lastTick).toBeDefined();
    });
    it ("needs a 'tilt' defined", function() {
      expect(ufo.tilt).toBeDefined();
    });
    it ("tilt should be not-equal to zero when movement is either left or right", function() {
      var time = 9999;
      ufo.movement = "left";
      ufo.render(time);
      expect(ufo.tilt).not.toBe(0);

      ufo.movement = "right";
      ufo.render(time);
      expect(ufo.tilt).not.toBe(0);
    });
  });

  describe("drawing", function() {
    it ("should have a draw function", function() {
      expect(typeof ufo.draw).toBe('function');
    });

    it ("draw function should accept one param (context)", function() {
      expect(ufo.draw.length).toEqual(1);
    });

    it ("should use context to drawImage", function() {
      var x = {
        drawImage: function() {},
        save: function() {},
        translate: function() {},
        rotate: function() {},
        restore: function() {},
      };
      spyOn(x, 'drawImage');
      ufo.draw(x);
      expect(x.drawImage).toHaveBeenCalled();
    });
  });

  describe("ufo beam functionality", function() {
    it ("should have a 'is_beaming' flag", function() {
      expect(ufo.is_beaming).toBeDefined();
    });
    it ("should have a 'beam_fps' to govern beam framerate", function() {
      expect(ufo.beam_fps).toBeDefined();
    });
    it ("should have a 'beam' var that contains an image", function() {
      expect(Object.prototype.toString.call(ufo.beam)).toBe("[object HTMLImageElement]");
    });
    it ("'beam_count' to pace beams; initialized at 0", function() {
      expect(ufo.beam_count).toEqual(0);
    });
  });

  describe("stateful stuff", function() {
    it ("should have an 'x'", function() {
      expect(ufo.x).toBeDefined();
    });
    it ("should have a 'y'", function() {
      expect(ufo.x).toBeDefined();
    });
    it ("should have an 'fps'", function() {
      expect(ufo.fps).toBeDefined();
    });
    it ("should have a 'movement' string", function() {
      expect(typeof ufo.movement).toBe("string");
    });
    it ("should have a 'speed' defined", function() {
      expect(ufo.speed).toBeDefined();
    });
  });
});
