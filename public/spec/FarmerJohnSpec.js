describe('FarmerJohn', function() {
  var farmerJohn;
  var canvas;

  beforeEach(function() {
    canvas = {
      width: 800,
      height: 800
    };
    farmerJohn = new FarmerJohn(canvas);
  });

  describe('constructor', function() {
    it ("should have a 'frames' array with image objects", function() {
      expect(farmerJohn.frames.length).toBeGreaterThan(0);
      for (var i = 0; i < farmerJohn.frames.length; i++) {
        expect(Object.prototype.toString.call(farmerJohn.frames[i])).toBe("[object HTMLImageElement]");
      }
    });
  });

  describe('render', function() {
    it ('should exist as a function', function() {
      expect(typeof farmerJohn.render).toBe('function');
    });
    it ('arity of one', function() {
      expect(farmerJohn.render.length).toEqual(1);
    });
  });

});
