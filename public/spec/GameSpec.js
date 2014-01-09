describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
    game.init(800, 800);
  });

  describe("constructor", function() {
    it ("should define a lastTick", function() {
      expect(game.lastTick).toBeDefined();
    });
    it ("should define a cowDelay", function() {
      expect(game.cowDelay).toBeDefined();
    });
  });

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

    it ("should accept one parameter (context)", function() {
      expect(game.draw.length).toEqual(1);
    });
  });

  describe ("event handling", function() {
    it ("should have a key_down function with arity of one (1)", function() {
      expect(typeof game.key_down).toBe("function");
      expect(game.key_down.length).toEqual(1);
    });
    it ("should have a key_up function with arity of one (1)", function() {
      expect(typeof game.key_up).toBe("function");
      expect(game.key_up.length).toEqual(1);
    });
    it ("should have a key_press function with arity of one (1)", function() {
      expect(typeof game.key_press).toBe("function");
      expect(game.key_press.length).toEqual(1);
    });
  });

  describe("ufoHit", function() {
    it ("should return the closest ufo that intersects with linesight", function() {
      var ufo1 = {
        name: "ufo1",
        x: 5,
        y: 5,
        width: 20,
        height: 20,
      };
      var ufo2 = {
        name: "ufo2",
        x: 8,
        y: 8,
        width: 20,
        height: 20,
      };
      game.ufos = [ufo1, ufo2];
      var result = game.ufoHit();
      expect(result.name).toBe("ufo2");
    });
    it ("should return false if no ufos instersect", function() {
      var ufo1 = {
        name: "ufo1",
        x: 100,
        y: 5,
        width: 2,
        height: 2,
      };
      var ufo2 = {
        name: "ufo2",
        x: 10,
        y: 2,
        width: 2,
        height: 2,
      };
      game.ufos = [ufo1, ufo2];
      var result = game.ufoHit();
      expect(result).toBe(false);
    });
  });
});
