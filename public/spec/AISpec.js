describe("AI", function() {
  describe("nested object structure", function() {
    var ai,
        canvasHeight = 500,
        canvasWidth = 500;

    beforeEach(function() {
      ai = new AI(canvasWidth, canvasHeight);
    });

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
            var leftBound = (canvasWidth * .2) / 2,
                rightBound = (canvasWidth - leftBound);
            expect(ai.cows[i].x).not.toBeGreaterThan(rightBound);
            expect(ai.cows[i].x).not.toBeLessThan(leftBound);
          }
        });
        it ("should set target_x ±75 from x for each cow", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            expect(ai.cows[i].target_x).not.toBeGreaterThan(ai.cows[i].x + 75);
            expect(ai.cows[i].target_x).not.toBeLessThan(ai.cows[i].x - 75);
          }
        });
        it ("should set target_y to something, i don't know yet", function() {
          for (var i = 0; i < ai.cows.length; i++) {
            expect(ai.cows[i].target_y).not.toEqual(0);
          }
        });
      });

      describe ("ufos", function() {
        it ("should have a ufos object inside init", function() {
          expect(typeof ai.init.ufos).toBe('object');
        });
        it ("init ufos should have an attack method", function() {
          expect(typeof ai.init.ufos.attack).toBe('function');
        });
        it ("ufos attack should populate AI.ufos with objects", function() {
          ai.init.ufos.attack();
          expect(ai.ufos.length).toBeGreaterThan(0);
        });
        it ("should add a 'target_x' property to ufo objets", function() {
          ai.init.ufos.attack();
          for (var i = 0; i < ai.ufos.length; i++) {
            expect(ai.ufos[i].target_x).toBeDefined();
          }
        });
      });
    });
    describe("render", function() {
      it ("should have a render object", function() {
        expect(typeof ai.render).toBe('object');
      });
      describe ("ufos", function() {
        it ("should have a ufos object inside render", function() {
          expect(typeof ai.render.ufos).toBe('object');
        });
        it ("render.ufos should have an attack method", function() {
          expect(typeof ai.render.ufos.attack).toBe('function');
        });
        it ("render.ufos.attack should accept one parameter (time)", function() {
          expect(ai.render.ufos.attack.length).toEqual(1);
        });
      });
      describe ("cows", function() {
        it ("should be a function", function() {
          expect(typeof ai.render.cows).toBe("function");
        });
        it ("should expect one param for time", function() {
          expect(ai.render.cows.length).toEqual(1);
        });
        describe("deciding whether to move or not", function() {
          beforeEach(function() {
            ai.init.cows();
          });
          it ("should set movement to up-right if x < target_x and y is < target_y", function() {
            var cow;
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              cow.x = 5;
              cow.y = 10;
              cow.target_x = 10;
              cow.target_y = 5;
            }
            ai.render.cows((new Date).getTime());
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              expect(cow.movement).toBe("up-right");
            }
          });
          it ("should set movement to up-left if x > target_x and y is < target_y", function() {
            var cow;
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              cow.x = 10;
              cow.y = 10;
              cow.target_x = 5;
              cow.target_y = 5;
            }
            ai.render.cows((new Date).getTime());
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              expect(cow.movement).toBe("up-left");
            }
          });
          it ("should set movement to left if x > target_x and y == target_y", function() {
            var cow;
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              cow.x = 10;
              cow.y = 5;
              cow.target_x = 5;
              cow.target_y = 5;
            }
            ai.render.cows((new Date).getTime());
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              expect(cow.movement).toBe("left");
            }
          });
          it ("should set movement to right if x < target_x and y == target_y", function() {
            var cow;
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              cow.x = 5;
              cow.y = 10;
              cow.target_x = 10;
              cow.target_y = 10;
            }
            ai.render.cows((new Date).getTime());
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              expect(cow.movement).toBe("right");
            }
          });
          it ("should set movement to up if x = target_x and y > target_y", function() {
            var cow;
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              cow.x = 5;
              cow.y = 10;
              cow.target_x = 5;
              cow.target_y = 5;
            }
            ai.render.cows((new Date).getTime());
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              expect(cow.movement).toBe("up");
            }
          });
          it ("should set movement to still if x = target_x and y == target_y", function() {
            var cow;
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              cow.x = 5;
              cow.y = 5;
              cow.target_x = 5;
              cow.target_y = 5;
            }
            ai.render.cows((new Date).getTime());
            for (var i = 0; i < ai.cows.length; i++) {
              cow = ai.cows[i];
              expect(cow.movement).toBe("still");
            }
          });
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
        it ("should have a ufos object inside draw", function() {
          expect(typeof ai.draw.ufos).toBe('object');
        });
        it ("draw.ufos should have an attack method", function() {
          expect(typeof ai.draw.ufos.attack).toBe('function');
        });
        it ("draw.ufos.attack should accept one parameter (context)", function() {
          expect(ai.draw.ufos.attack.length).toEqual(1);
        });
      });
    });
  });
});
