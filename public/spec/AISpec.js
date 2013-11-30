describe("AI", function() {
  //var ai = new AI();
  describe("nested object structure", function() {
    var ai;
    beforeEach(function() {
      ai = new AI();
    });
    describe("init", function() {
      it ("should have an init object", function() {
        expect(typeof ai.init).toBe('object');
      });
      it ("should have a ufos object inside init", function() {
        expect(typeof ai.init.ufos).toBe('object');
      });
      it ("init ufos should have an attack method", function() {
        expect(typeof ai.init.ufos.attack).toBe('function');
      });
      it ("ufos attack should populate AI.ufos with objects", function() {
        ai.init.ufos.attack();
        expect(ai.ufos.length).toBeGreaterThan(0);
      });
      it ("should add a 'target_x' property to ufo objets", function() {
        ai.init.ufos.attack();
        for (var i = 0; i < ai.ufos.length; i++) {
          expect(ai.ufos[i].target_x).toBeDefined();
        }
      });
    });
    describe("render", function() {
      it ("should have a render object", function() {
        expect(typeof ai.render).toBe('object');
      });
      it ("should have a ufos object inside render", function() {
        expect(typeof ai.render.ufos).toBe('object');
      });
      it ("render.ufos should have an attack method", function() {
        expect(typeof ai.render.ufos.attack).toBe('function');
      });
      it ("render.ufos.attack should accept one parameter (time)", function() {
        expect(ai.render.ufos.attack.length).toEqual(1);
      });
    });
    describe("draw", function() {
      it ("should have a draw object", function() {
        expect(typeof ai.draw).toBe('object');
      });
      it ("should have a ufos object inside draw", function() {
        expect(typeof ai.draw.ufos).toBe('object');
      });
      it ("draw.ufos should have an attack method", function() {
        expect(typeof ai.draw.ufos.attack).toBe('function');
      });
      it ("draw.ufos.attack should accept one parameter (context)", function() {
        expect(ai.draw.ufos.attack.length).toEqual(1);
      });
    });
  });
});
