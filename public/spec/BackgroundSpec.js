describe("Background", function() {
  var bg;
  var canvas;
  beforeEach(function() {
    canvas = {
      width: 800,
      height: 800
    };
    bg = new Background(canvas);
  });

  describe("constructor", function() {
    it ("should accept one param(canvas)", function () {
      expect(Background.length).toEqual(1);
    });
    it ("should have foreground defined", function() {
      expect(bg.foreground).toBeDefined();
    });
    it ("should have background defined", function() {
      expect(bg.background).toBeDefined();
    });
    it ("should have canvas defined", function() {
      expect(bg.canvas).toBeDefined();
    });
    it ("should have frames defined", function() {
      expect(bg.frames).toBeDefined();
    });
    it ("should have frames populated only with Image objects", function() {
      expect(bg.frames.length).toBeGreaterThan(0);
      for (var i = 0; i < bg.frames.length; i++) {
        expect(Object.prototype.toString.call(bg.frames[i])).toBe("[object HTMLImageElement]");
      }
    });
  });

  describe("render", function() {
    it ("should exist as a fn", function() {
      expect(typeof bg.render).toBe("function");
    });
    it ("should accept one parameter", function() {
      expect(bg.render.length).toEqual(1);
    });
  });

  describe("draw", function() {
    it ("should exist as a fn", function() {
      expect(typeof bg.draw).toBe("function");
    });
    it ("should accept one parameter", function() {
      expect(bg.draw.length).toEqual(1);
    });
  });

  describe("drawBg", function() {
    it ("should exist as a fn", function() {
      expect(typeof bg.drawBg).toBe("function");
    });
    it ("should accept one parameter (context)", function() {
      expect(bg.drawBg.length).toEqual(1);
    });
    it ("should draw to the canvas", function() {
      var context = {
        "drawImage": function() {},
      };

      if (!bg.allImagesLoaded()) {
        bg.background.height = 500;
        bg.background.width = 500;
        bg.allImagesLoaded = function() {
          return true;
        };
      }
      spyOn(context, "drawImage");
      bg.drawBg(context);
      expect(context.drawImage).toHaveBeenCalled();
    });
  });

  describe("drawFg", function() {
    it ("should exist as a fn", function() {
      expect(typeof bg.drawFg).toBe("function");
    });
    it ("should accept one parameter (context)", function() {
      expect(bg.drawFg.length).toEqual(1);
    });
    it ("should draw to the canvas", function() {
      var context = {
        "drawImage": function() {},
      };
      spyOn(context, "drawImage");
      if (!bg.allImagesLoaded()) {
        bg.foreground.width = 500;
        bg.allImagesLoaded = function() {
          return true;
        };
      }
      bg.drawFg(context);
      expect(context.drawImage).toHaveBeenCalled();
    });
  });

  describe("allImagesLoaded", function() {
    it ("should exist as a fn", function() {
      expect(typeof bg.allImagesLoaded).toBe("function");
    });
    it ("should return a bool", function() {
      var result = bg.allImagesLoaded();
      expect(typeof result).toBe("boolean");
    });
  });
});
