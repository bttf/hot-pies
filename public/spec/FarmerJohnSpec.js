describe('FarmerJohn', function() {
  var canvasWidth = 800,
      canvasHeight = 800;
  var farmerJohn;

  beforeEach(function() {
    farmerJohn = new FarmerJohn();
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
