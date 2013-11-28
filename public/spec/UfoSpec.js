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
      };
      spyOn(x, 'drawImage');
      ufo.draw(x);
      expect(x.drawImage).toHaveBeenCalled();
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
