describe("ShotGun.js", function() {
  var shotgun;
  
  describe("constructor", function() {
    beforeEach(function() {
      shotgun = new ShotGun();
    });
    it ("should maintain an isCocked flag", function() {
      expect(typeof shotgun.isCocked).toBe("boolean");
    });
  });

  describe("key_down", function() {
    beforeEach(function() {
      shotgun = new ShotGun();
    });
    it ("should exist", function() {
      expect(typeof shotgun.key_down).toBe("function");
    });
    it ("should accept one parameter", function() {
      expect(shotgun.key_down.length).toEqual(1);
    });
    it ("should set isCocked to true if e.keyCode is 32 (spacebar) and it is not already set", function() {
      shotgun.isCocked = false;
      var e = {
        "keyCode": 32,
      };
      shotgun.key_down(e);
      expect(shotgun.isCocked).toBe(true);

      shotgun.isCocked = false;
      var e = {
        "keyCode": 42,
      };
      shotgun.key_down(e);
      expect(shotgun.isCocked).toBe(false);
    });
  });

  describe("mouse_down", function() {
    beforeEach(function() {
      shotgun = new ShotGun();
    });
    it ("should exist", function() {
      expect(typeof shotgun.mouse_down).toBe("function");
    });
    it ("should accept one parameter", function() {
      expect(shotgun.mouse_down.length).toEqual(1);
    });
    it ("should set isCocked from true to false", function() {
      var e = {};
      shotgun.isCocked = true;
      shotgun.mouse_down(e);
      expect(shotgun.isCocked).toBe(false);
    });
  });
});
