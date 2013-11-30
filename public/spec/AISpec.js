describe("AI", function() {
  var ai = new AI();
  describe("nested object structure", function() {
    describe("init", function() {
      it ("should have an init object", function() {
        expect(typeof ai.init).toBe('object');
      });
      it ("init should have a ufos object inside init", function() {
        expect(typeof ai.init.ufos).toBe('object');
      });
      it ("init ufos should have an attack method", function() {
        expect(typeof ai.init.ufos.attack).toBe('function');
      });
    });
    describe("render", function() {
      it ("should have a render object", function() {
        expect(typeof ai.render).toBe('object');
      });
      it ("should have a ufos object inside render", function() {
        expect(typeof ai.render.ufos).toBe('object');
      });
      it ("render.ufos should have an attack object", function() {
        expect(typeof ai.render.ufos.attack).toBe('object');
      });
    });
    describe("draw", function() {
      it ("should have a draw object", function() {
        expect(typeof ai.draw).toBe('object');
      });
      it ("should have a ufos object inside draw", function() {
        expect(typeof ai.draw.ufos).toBe('object');
      });
      it ("draw.ufos should have an attack object", function() {
        expect(typeof ai.draw.ufos.attack).toBe('object');
      });
    });
  });
});
