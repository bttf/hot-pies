describe("Game", function() {
  var game = new Game();

  describe("'init' function", function() {
    it ("should have an 'init' function", function() {
      expect(typeof game.init).toBe('function');
    });
  });

  describe ("'render' function", function() {
    it ("should have a 'render' function", function() {
      expect(typeof game.render).toBe('function');
    });

    it ("should accept one (1) parameter for time", function() {
      expect(game.render.length).toEqual(1);
    });
  });

  describe ("'draw' method", function() {
    it ("should have a 'draw' function", function() {
      expect(typeof game.draw).toBe('function');
    });

    it ("should accept two (2) parameters (context and time)", function() {
      expect(game.draw.length).toEqual(2);
    });
  });

  describe ("other stuff", function() {
    it ("should have a local ufo object", function() {
      expect(game.ufo).toBeDefined();
    });

    it ("should keep a 'lastTick' var for time keeping", function() {
      expect(game.lastTick).toBeDefined();
    });
  });
});
