describe("Cow.js", function() {
  var cow;
  beforeEach(function() {
    cow = new Cow();
  });
  describe("constructor", function() {
    it ("should have a 'movement' var", function() {
      expect(cow.movement).toBeDefined();
    });
    it ("should have 'speed' defined", function() {
      expect(cow.speed).toBeDefined();
    });
    it ("needs 'fps' defined", function() {
      expect(cow.fps).toBeDefined();
    });
    it ("should have a 'frames' array with image objects", function() {
      expect(cow.frames.length).toBeGreaterThan(0);
      for (var i = 0; i < cow.frames.length; i++) {
        expect(Object.prototype.toString.call(cow.frames[i])).toBe("[object HTMLImageElement]");
      }
    });
    it ("should have target_x and target_y defined", function() {
      expect(cow.target_x).toBeDefined();
      expect(cow.target_y).toBeDefined();
    });
  });

  describe("render", function() {
    it ("should expect one param (time)", function() {
      expect(cow.render.length).toEqual(1);
    });
    it ("should increase x by speed if movement is equal to 'right'", function() {
      var cow_x = cow.x;
      var cow_speed = cow.speed;
      cow.movement = "right";
      cow.render((new Date).getTime());
      expect(cow.x).toEqual(cow_x + cow_speed);
    });
    it ("should decrease x by speed if movement is equal to 'left'", function() {
      var cow_x = cow.x;
      var cow_speed = cow.speed;
      cow.movement = "left";
      cow.render((new Date).getTime());
      expect(cow.x).toEqual(cow_x - cow_speed);
    });
    it ("should decrease x AND decrease y by speed if movement is equal to 'up-left'", function() {
      var cow_x = cow.x;
      var cow_y = cow.y;
      cow.movement = "up-left";
      cow.render((new Date).getTime());
      expect(cow.x).toEqual(cow_x - cow.speed);
      expect(cow.y).toEqual(cow_y - cow.speed);
    });
    it ("should increase x AND decrease y by speed if movement is equal to 'up-right", function() {
      var cow_x = cow.x;
      var cow_y = cow.y;
      cow.movement = "up-right";
      cow.render((new Date).getTime());
      expect(cow.x).toEqual(cow_x + cow.speed);
      expect(cow.y).toEqual(cow_y - cow.speed);
    });
    it ("lastTick should equal time parameter after render with left or right", function() {
      var x = 12345;
      cow.movement = "left";
      cow.render(x);
      expect(cow.lastTick).toEqual(x);

      cow.movement = "right";
      x = 67890;
      cow.render(x);
      expect(cow.lastTick).toEqual(x);
    });
    describe("movement up", function() {
      it ("should decrease y by speed if movement is equal to 'up'", function() {
        var cow_y = cow.y;
        var cow_speed = cow.speed;
        cow.movement = "up";
        cow.render((new Date).getTime());
        expect(cow.y).toEqual(cow_y - cow_speed);
      });
    });
    describe("updateFrame method", function() {
      it ("should exist", function() {
        expect(typeof cow.updateFrame).toBe("function");
      });
      it ("should update frame to 0 or 1 if movement is 'left'", function() {
        var time = (new Date).getTime();
        cow.movement = "left";
        //cow.render(time);
        cow.updateFrame();
        var result = (cow.frame == 0 || cow.frame == 1);
        expect(result).toBe(true);
        cow.lastTick = 0;

        if (cow.frame == 0) {
          cow.updateFrame();
          expect(cow.frame).toEqual(1);
        }
        else {
          cow.updateFrame();
          expect(cow.frame).toEqual(0);
        }
      });
      it ("should update frame to 2 or 3 if movement is 'right'", function() {
        var time = (new Date).getTime();
        cow.movement = "right";
        cow.updateFrame();
        var result = (cow.frame == 2 || cow.frame == 3);
        expect(result).toBe(true);

        if (cow.frame == 2) {
          cow.updateFrame();
          expect(cow.frame).toEqual(3);
        }
        else {
          cow.updateFrame();
          expect(cow.frame).toEqual(2);
        }
      });
      it ("should maintain 0,1 or 2,3 when movement is 'up'", function() {
        cow.movement = "right";
        cow.updateFrame();
        cow.movement = "up";
        cow.updateFrame();
        var result = (cow.frame == 2 || cow.frame == 3);
        expect(result).toBe(true);
        if (cow.frame == 2) {
          cow.updateFrame();
          expect(cow.frame).toEqual(3);
        }
        else {
          cow.updateFrame();
          expect(cow.frame).toEqual(2);
        }

        cow.movement = "left";
        cow.updateFrame();
        cow.movement = "up";
        cow.updateFrame();
        result = (cow.frame == 0 || cow.frame == 1);
        expect(result).toBe(true);
        if (cow.frame == 0) {
          cow.updateFrame();
          expect(cow.frame).toEqual(1);
        }
        else {
          cow.updateFrame();
          expect(cow.frame).toEqual(0);
        }
      });
    });
  });

  describe("draw", function() {
    it ("should expect one param (context)", function() {
      expect(cow.draw.length).toEqual(1);
    });
    it ("should call drawImage on context", function() {
      var context = {
        "drawImage": function() {},
      };
      spyOn(context, "drawImage");
      cow.draw(context);
      expect(context.drawImage).toHaveBeenCalled();
    });
  });

  describe("static method(s)", function() {
    describe("delayTickHasPassed", function() {
      it ("function exists", function() {
        expect(typeof cow.delayTickHasPassed).toBe("function");
      });
      it ("expects one parameter for time", function() {
        expect(cow.delayTickHasPassed.length).toEqual(1);
      });
      it ("returns true if time is greater than this.lastTick+this.fps", function() {
        var x = 1;
        var time = 3 * x;
        cow.lastTick = x;
        cow.fps = x;
        var result = cow.delayTickHasPassed(time);
        expect(result).toBe(true);
      });
      it ("returns false if time is not greater than this.lastTick+this.fps", function() {
        var x = 1;
        cow.lastTick = x;
        cow.fps = x;
        var result = cow.delayTickHasPassed(x);
        expect(result).toBe(false);
      });
    });
  });
});
