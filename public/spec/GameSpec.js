describe("Game", function() {
  var game;
  var canvas;

  beforeEach(function() {
    canvas = {
      width: 800,
      height: 800
    };
    game = new Game(canvas);
    game.init(canvas);
    game.muteAudio = true;
    game.shotgun.muteAudio = true;
  });

  describe("constructor", function() {
    it ("should define a lastTick", function() {
      expect(game.lastTick).toBeDefined();
    });
    it ("should define a cowDelay", function() {
      expect(game.cowDelay).toBeDefined();
    });
    it ("should have a ufoAi object instantiated", function() {
      expect(game.ufoAi).toBeDefined();
    });
    it ("should have a music Audio object", function() {
      expect(Object.prototype.toString.call(game.music)).toBe("[object HTMLAudioElement]");
    });
  });

  describe("'init' function", function() {
    it ("should have an 'init' function", function() {
      expect(typeof game.init).toBe('function');
    });
    it ("should play music if muteAudio is false/undefined", function() {
      var mockMusic = {
        play: function() {},
      };
      game.muteAudio = undefined;
      spyOn(mockMusic, "play");
      game.music = mockMusic;
      game.init(canvas);
      expect(mockMusic.play).toHaveBeenCalled();

      game.muteAudio = false;
      game.music = mockMusic;
      game.init(canvas);
      expect(mockMusic.play).toHaveBeenCalled();
    });
    it ("should not play music if muteAudio is true", function() {
      var mockMusic = {
        play: function() {},
      };
      game.muteAudio = true;
      spyOn(mockMusic, "play");
      game.music = mockMusic;
      game.init(canvas);
      expect(mockMusic.play).not.toHaveBeenCalled();
    });
    it ('should init UfoAi', function() {
      var ufoAi = {
        'init': function() {},
      };
      spyOn(ufoAi, 'init');
      game.ufoAi = ufoAi;
      game.init(canvas);
      expect(ufoAi.init).toHaveBeenCalled();
    });
  });

  describe ("'render' function", function() {
    it ("should have a 'render' function", function() {
      expect(typeof game.render).toBe('function');
    });

    it ("should accept one (1) parameter for time", function() {
      expect(game.render.length).toEqual(1);
    });
    it ("should make a call to ufoAi.generateUfos if cows is > 0", function() {
      var ufoAi = {
        'generateUfos': function() {},
      };
      spyOn(ufoAi, 'generateUfos');
      game.ufoAi = ufoAi;
      game.cows = [];

      var time = 0;
      game.render(time)
      expect(ufoAi.generateUfos).not.toHaveBeenCalledWith(game.ufos, game.cows, time);

      game.cows = [ { 'render': function() {} } ];

      var time = 0;
      game.render(time)
      expect(ufoAi.generateUfos).toHaveBeenCalledWith(game.ufos, game.cows, time);
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
      expect(result).toBe(ufo2);
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

  describe("mouse_down", function() {
    it ("should execute ufoHit if shotgun isCocked", function () {
      game.shotgun.isCocked = true;
      var mockUfoHit = {
        ufoHit: function() {},
      };
      var e = {};
      spyOn(mockUfoHit, "ufoHit");
      game.ufoHit = mockUfoHit.ufoHit;
      game.mouse_down(e);
      expect(mockUfoHit.ufoHit).toHaveBeenCalled();
    });
    it ("should execute 'explode' function for ufo returned by ufoHit", function() {
      game.shotgun.isCocked = true;
      var ufo1 = {};
      var ufo2 = {
        explode: function() {},
      };      
      game.ufos = [ufo1, ufo2];
      var mockUfoHit = function() {
        return ufo2;
      };
      var e = {};
      spyOn(ufo2, "explode");
      game.ufoHit = mockUfoHit;
      game.mouse_down(e);
      expect(ufo2.explode).toHaveBeenCalled();
    });
  });
});
