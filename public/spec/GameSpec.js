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

});
