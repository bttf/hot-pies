describe('UfoAi', function() {
  var ufoAi;
  var canvasWidth = 500,
    canvasHeight = 500;
  beforeEach(function() {
    ufoAi = new UfoAi();
  });

  describe('constructor', function() {
    it ('should instantiate', function() {
      expect(ufoAi).toBeDefined();
    });
    it ('should keep a lastTick property', function() {
      expect(ufoAi.lastTick).toBeDefined();
    });
    it ('should keep a ufoDelay property', function() {
      expect(ufoAi.ufoDelay).toBeDefined();
    });
    it ('should keep a ufoDelayDecay property', function() {
      expect(ufoAi.ufoDelayDecay).toBeDefined();
    });
    it ('should keep a ufoDelcayDecayCutoff property', function() {
      expect(ufoAi.ufoDelayDecayCutoff).toBeDefined();
    });
  });

  describe('init', function() {
    it ('should exist as a function', function() {
      expect(typeof ufoAi.init).toBe('function');
    });
    it ('should have an arity of two, for canvasWidth and canvasHeight', function() {
      expect(ufoAi.init.length).toEqual(2);
    });
    it ('should set object properties canvasWidth and canvasHeight', function() {
      ufoAi.init(canvasWidth, canvasHeight);
      expect(ufoAi.canvasWidth).toEqual(canvasWidth);
      expect(ufoAi.canvasHeight).toEqual(canvasHeight);
    });
  });

  describe('generateUfos', function() {
    var cows = [ { 'name': 'cow1' }, { 'name': 'cow2' } ];
    var ufos = [ { 'name': 'ufo1' }, { 'name': 'ufo2' }, { 'name': 'ufo3' } ];
    it ('should exist as a function', function() {
      expect(typeof ufoAi.generateUfos).toBe('function');
    });
    it ('should have an arity of three, for a list of ufos, a list of cows and time', function() {
      expect(ufoAi.generateUfos.length).toEqual(3);
    });
    it ('should randomly select an index from cows', function() {
      ufoAi.generateUfos(ufos, cows);
      expect(ufoAi.randCowIndex).toBeDefined();
      var withinBounds = ufoAi.randCowIndex >= 0 && ufoAi.randCowIndex < cows.length;
      expect(withinBounds).toBe(true);
    });
    it ('should add a ufo to ufos if time is greater than lastTick + ufoDelay', function() {
      var curLen = ufos.length;
      ufoAi.lastTick = 5;
      ufoAi.ufoDelay = 4;
      var time = 10;
      ufoAi.generateUfos(ufos, cows, time);
      expect(ufos.length).toEqual(curLen + 1);

      ufoAi.lastTick = 3;
      ufoAi.ufoDelay = 4;
      var time = 0;
      ufoAi.generateUfos(ufos, cows, time);
      expect(ufos.length).toEqual(curLen + 1); // not +2
    });
    it ('should set lastTick to time if time is greater than lastTick + ufoDelay', function() {
      ufoAi.lastTick = 5;
      ufoAi.ufoDelay = 4;
      var time = 10;
      ufoAi.generateUfos(ufos, cows, time);
      expect(ufoAi.lastTick).toEqual(time);
    });
    it ('should decrement ufoDelay by ufoDelayDecay if time is greater than lastTick + ufoDelay and ufoDelayDecay is greater than ufoDelayDecayCutoff', function() {
      var time = 11;
      ufoAi.ufoDelay = 10;
      ufoAi.lastTick = 0;
      ufoAi.ufoDelayDecay = 5;
      ufoAi.generateUfos(ufos, cows, time);
      expect(ufoAi.ufoDelay).toEqual(10);

      var time = 11;
      ufoAi.ufoDelay = 10;
      ufoAi.lastTick = 0;
      ufoAi.ufoDelayDecay = 5;
      ufoAi.ufoDelayDecayCutoff = 0;
      ufoAi.generateUfos(ufos, cows, time);
      expect(ufoAi.ufoDelay).toEqual(5);

      var time = 5;
      ufoAi.ufoDelay = 10;
      ufoAi.lastTick = 0;
      ufoAi.ufoDelayDecay = 5;
      ufoAi.ufoDelayDecayCutoff = 0;
      ufoAi.generateUfos(ufos, cows, time);
      expect(ufoAi.ufoDelay).toEqual(10);
    });
    it ('should assign a cow to all ufos without one', function() {
      ufoAi.generateUfos(ufos, cows);
      for (var i = 0; i < ufos.length; i++) {
        var result =
          ufos[i].targetCow.name === 'cow1' ||
          ufos[i].targetCow.name === 'cow2';
        expect(result).toBe(true);
      }
    });
  });
});
