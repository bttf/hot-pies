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
});
