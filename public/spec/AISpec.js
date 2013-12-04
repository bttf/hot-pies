describe("AI", function() {
  var ai;
  var canvasHeight = 500; 
  var canvasWidth = 500;

  beforeEach(function() {
    ai = new AI(canvasWidth, canvasHeight);
  });
  describe("nested object structure", function() {
    describe("init", function() {
      it ("should have an init object", function() {
        expect(typeof ai.init).toBe('object');
      });

      describe("cows", function() {
        beforeEach(function() {
          ai.init.cows();
        });
        it ("should instantiate a bunch of cows", function() {
          expect(ai.cows).toBeDefined();
          expect(ai.cows.length).toBeGreaterThan(0);
        });
        it ("cows should be instantiated with non-zero x and y values", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            expect(ai.cows.x).not.toEqual(0);
            expect(ai.cows.y).not.toEqual(0);
          }
        });
        it ("should set y greater than canvas height for each cow", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            expect(ai.cows[i].y).toBeGreaterThan(canvasHeight);
          }
        });
        it ("should set x to a random value within center 80% of width", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            var leftBound = (canvasWidth * .2) / 2;
            var rightBound = (canvasWidth - leftBound);
            expect(ai.cows[i].x).not.toBeGreaterThan(rightBound);
            expect(ai.cows[i].x).not.toBeLessThan(leftBound);
          }
        });
        it ("should set target_x within canvasWidth", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            expect(ai.cows[i].target_x).not.toBeGreaterThan(canvasWidth);
            expect(ai.cows[i].target_x).not.toBeLessThan(0);
          }
        });
        it ("should set target_y to something, i don't know yet", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            expect(ai.cows[i].target_y).not.toEqual(0);
          }
        });
      });
      describe ("ufos", function() {
        it ("should be a function", function() {
          expect(typeof ai.init.ufos).toBe("function");
        });
        it ("should populate AI.ufos with objects", function() {
          ai.init.ufos();
          expect(ai.ufos.length).toBeGreaterThan(0);
        });
      });
    });

    describe("render", function() {
      it ("should have a render object", function() {
        expect(typeof ai.render).toBe('object');
      });
      describe ("ufos", function() {
        it ("should be a function", function() {
          expect(typeof ai.render.ufos).toBe("function");
        });
        it ("render.ufos should accept one parameter (time)", function() {
          expect(ai.render.ufos.length).toEqual(1);
        });
        it ("movement should remain 'still' if target_x is undefined", function() {
          for (var i = 0; i < ai.ufos.length; i++) {
            delete ai.ufos[i].target_x;
            ai.render.ufos((new Date).getTime());
            expect(ai.ufos.movement).toBe("still");
          }
        });
      });
      describe ("cows", function() {
        it ("should be a function", function() {
          expect(typeof ai.render.cows).toBe("function");
        });
        it ("should expect one param for time", function() {
          expect(ai.render.cows.length).toEqual(1);
        });
      });
    });
    describe("draw", function() {
      it ("should have a draw object", function() {
        expect(typeof ai.draw).toBe('object');
      });
      describe ("cows", function() {
        it ("should exist as a function", function() {
          expect(typeof ai.draw.cows).toBe("function");
        });
        it ("should accept one parameter, context", function() {
          expect(ai.draw.cows.length).toEqual(1);
        });
      });
      describe ("ufos", function() {
        it ("should be a function", function() {
          expect(typeof ai.draw.ufos).toBe("function");
        });
        it ("draw.ufos should accept one parameter (context)", function() {
          expect(ai.draw.ufos.length).toEqual(1);
        });
      });
    });
  });

  describe("setUfoMovement", function() {
    var ufo;
    beforeEach(function() {
      ufo = {};
    });
    it ("should exist as a function", function() {
      expect(typeof ai.setUfoMovement).toBe("function");
    });
    it ("should expect one parameter (ufo)", function() {
      expect(ai.setUfoMovement.length).toEqual(1);
    });
    it ("should set ufo movement to 'still' if target_x is undefined", function() {
      ufo.movement = "something";
      ai.setUfoMovement(ufo);
      expect(ufo.movement).toBe("still");
    });
    it ("should set movement to right if x < target_x-5", function() {
      ufo.x = 5;
      ufo.target_x = 20;
      ufo.movement = "still";
      ai.setUfoMovement(ufo);
      expect(ufo.movement).toBe("right");
    });
    it ("should set movement to left if x > target_x+5", function() {
      ufo.x = 20;
      ufo.target_x = 5;
      ufo.movement = "still";
      ai.setUfoMovement(ufo);
      expect(ufo.movement).toBe("left");
    });
    it ("should set movement to still if x is > target_x-5and < target_x+5", function() {
      ufo.x = 20;
      ufo.target_x = 20;
      ufo.movement = "something";
      ai.setUfoMovement(ufo);
      expect(ufo.movement).toBe("still");
    });
  });

  describe("setCowMovement", function() {
    var cow;
    beforeEach(function() {
      cow = {};
    });
    it ("should exist as a function", function() {
      expect(typeof ai.setCowMovement).toBe("function");
    });
    it ("should accept one parameter (cow)", function() {
      expect(ai.setCowMovement.length).toEqual(1);
    });
    it ("should set movement to up-right if x < target_x-5 and y is > target_y", function() {
      cow.x = 5;
      cow.y = 10;
      cow.target_x = 20;
      cow.target_y = 5;
      cow.movement = "still";
      ai.setCowMovement(cow);
      expect(cow.movement).toBe("up-right");
    });
    it ("should set movement to up-left if x > target_x+5 and y is < target_y", function() {
      cow.x = 10;
      cow.y = 10;
      cow.target_x = 0;
      cow.target_y = 5;
      cow.movement = "still";
      ai.setCowMovement(cow);
      expect(cow.movement).toBe("up-left");
    });
    it ("should set movement to left if x > target_x+5 and y == target_y", function() {
      cow.x = 10;
      cow.y = 5;
      cow.target_x = 0;
      cow.target_y = 5;
      cow.movement = "still";
      ai.setCowMovement(cow);
      expect(cow.movement).toBe("left");
    });
    it ("should set movement to right if x < target_x-5 and y == target_y", function() {
      cow.x = 5;
      cow.y = 10;
      cow.target_x = 20;
      cow.target_y = 10;
      cow.movement = "still";
      ai.setCowMovement(cow);
      expect(cow.movement).toBe("right");
    });
    it ("should set movement to up if x = target_x and y > target_y", function() {
      cow.x = 5;
      cow.y = 10;
      cow.target_x = 5;
      cow.target_y = 5;
      cow.movement = "still";
      ai.setCowMovement(cow);
      expect(cow.movement).toBe("up");
    });
    it ("should set movement to still if x = target_x and y == target_y", function() {
      cow.x = 5;
      cow.y = 5;
      cow.target_x = 5;
      cow.target_y = 5;
      cow.movement = "still";
      ai.setCowMovement(cow);
      expect(cow.movement).toBe("still");
    });
  });
});

