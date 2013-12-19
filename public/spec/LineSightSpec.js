describe("LineSight", function() {
  var lineSight;
  describe("constructor", function() {
    beforeEach(function() {
      lineSight = new LineSight(0, 0);
    });
    it ("should accept an arity of two for canvasWidth and canvasHeight", function() {
      expect(LineSight.length).toEqual(2);
    });
    it ("should set x to first param (canvasWidth)", function() {
      var lineSight = new LineSight(12345, 0);
      expect(lineSight.x).toEqual(12345);
    });
    it ("should y to second param (canvasHeight)", function() {
      var lineSight = new LineSight(0, 12345);
      expect(lineSight.y).toEqual(12345);
    });
    it ("should initialize mouse_x to 0", function() {
      expect(lineSight.mouseX).toEqual(0);
    });
    it ("should initialize mouse_y to 0", function() {
      expect(lineSight.mouseY).toEqual(0);
    });
  });

  describe("render", function() {
    beforeEach(function() {
      lineSight - new LineSight(0, 0);
    });
    it ("should accept one parameter (time)", function() {
      expect(lineSight.render.length).toEqual(1);
    });
  });

  describe("draw", function() {
    beforeEach(function() {
      lineSight = new LineSight(0, 0);
    });
    it ("should accept one parameter (context)", function() {
      expect(lineSight.draw.length).toEqual(1);
    });
  });
  
  describe("mousemove", function() {
    beforeEach(function() {
      lineSight = new LineSight(0, 0);
    });
    it ("should accept one parameter (e)", function() {
      expect(lineSight.mousemove.length).toEqual(1);
    });
  });
});
