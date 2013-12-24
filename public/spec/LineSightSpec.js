describe("LineSight", function() {
  var lineSight;

  beforeEach(function() {
    lineSight = new LineSight(0, 0);
  });

  describe("constructor", function() {
    it ("should accept an arity of three for canvasWidth and canvasHeight and shooter obj", function() {
      expect(LineSight.length).toEqual(3);
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
    it ("should accept one parameter (time)", function() {
      expect(lineSight.render.length).toEqual(1);
    });
  });

  describe("draw", function() {
    it ("should accept one parameter (context)", function() {
      expect(lineSight.draw.length).toEqual(1);
    });
  });

  describe("mousemove", function() {
    it ("should accept one parameter (e)", function() {
      expect(lineSight.mousemove.length).toEqual(1);
    });
  });

  describe('doesIntersect', function() {
    it ('has arity of one', function() {
      expect(lineSight.doesIntersect.length).toEqual(1);
    });
    it ('returns true if linesight intersects given obj', function() {
      var obj = {
        x: 5,
        y: 5,
        height: 3,
        width: 3,
      };
      var shooter = {};
      var lineSight = new LineSight(10, 10, shooter);
      lineSight.mouseX = 0;
      lineSight.mouseY = 0;
      var result = lineSight.doesIntersect(obj);
      expect(result).toBe(true);
    });
    it ('should return false if linesight does not intersect obj', function() {
      var obj = {
        x: 5,
        y: 2, 
        height: 3,
        width: 3,
      };
      var shooter = {};
      var lineSight = new LineSight(10, 10, shooter);
      lineSight.mouseX = 0;
      lineSight.mouseY = 0;
      var result = lineSight.doesIntersect(obj);
      expect(result).toBe(false);
    });
    it ('should return false if obj passed in is missing properties (x, y, width, height)', function() {
      var obj = {
        x: 7,
        y: 3,
        height: 4,
      };
      var shooter = {};
      var lineSight = new LineSight(10, 10, shooter);
      lineSight.mouseX = 0;
      lineSight.mouseY = 0;
      var result = lineSight.doesIntersect(obj);
      expect(result).toBe(false);
    });
  });
});
