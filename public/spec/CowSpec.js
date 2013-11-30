describe("Cow.js", function() {
  var cow;
  beforeEach(function() {
    cow = new Cow();
  });

  it ("should have a 'movement' var", function() {
    expect(cow.movement).toBeDefined();
  });

  it ("should have 'speed' defined", function() {
    expect(cow.speed).toBeDefined();
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
