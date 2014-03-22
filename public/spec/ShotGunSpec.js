describe("ShotGun.js", function() {
  var shotgun;
  beforeEach(function() {
    shotgun = new ShotGun();
    shotgun.muteAudio = true;
  });
  
  describe("constructor", function() {
    it ("should maintain an isCocked flag", function() {
      expect(typeof shotgun.isCocked).toBe("boolean");
    });
  });

  describe("key_down", function() {
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
    it ("should not play cock sound if muteAudio is true and vice versa", function() {
      var e = {
        'keyCode': 32,
      };
      var mockCock = {
        'play': function() {},
        'pause': function() {},
      };
      spyOn(mockCock, 'play');
      shotgun.cock = mockCock;
      shotgun.isCocked = false;
      shotgun.muteAudio = true;
      shotgun.key_down(e);
      expect(mockCock.play).not.toHaveBeenCalled();

      shotgun.cock = mockCock;
      shotgun.isCocked = false;
      shotgun.muteAudio = false;
      shotgun.key_down(e);
      expect(mockCock.play).toHaveBeenCalled();
    });
  });

  describe("mouse_down", function() {
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
    it ("should not play the blast if muteAudio is true, and vice versa", function() {
      var e = {};
      var mockBlast = {
        'play': function() {},
        'pause': function() {}
      };
      spyOn(mockBlast, 'play');
      shotgun.blast = mockBlast;
      shotgun.muteAudio = true;
      shotgun.isCocked = true;
      shotgun.mouse_down(e);
      expect(mockBlast.play).not.toHaveBeenCalled();

      shotgun.blast = mockBlast;
      shotgun.muteAudio = false;
      shotgun.isCocked = true;
      shotgun.mouse_down(e);
      expect(mockBlast.play).toHaveBeenCalled();
    });
  });
});
