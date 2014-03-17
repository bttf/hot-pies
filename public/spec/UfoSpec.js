describe("Ufo", function() {
  var cow, ufo;
  beforeEach(function() {
    cow = new Cow(0,0);
    ufo = new Ufo(0, 0, cow);
  });

  describe("constructor", function() {
    it ("should have a 'frames' array", function() {
      expect(Object.prototype.toString.call(ufo.frames)).toBe("[object Array]");
    });

    it ("should have a 'frame' int", function() {
      expect(typeof ufo.frame).toBe("number");
    });
    
    it ("should have frames loaded with Images", function() {
      expect(ufo.frames.length).toBeGreaterThan(0);
      for (var i = 0; i < ufo.frames.length; i++) {
        expect(Object.prototype.toString.call(ufo.frames[i])).toBe("[object HTMLImageElement]");
      }
    });
    it ("needs to have a beamDelay", function() {
      expect(ufo.beamDelay).toBeDefined();
    });
    it ("needs a beamTick", function() {
      expect(ufo.beamTick).toBeDefined();
    });
    it ("should have an explosionSfx array", function() {
      expect(Object.prototype.toString.call(ufo.explosionSfx)).toBe("[object Array]");
    });
    it ("explosionSfx should be loaded with Audio objs", function() {
      expect(ufo.explosionSfx.length).toBeGreaterThan(0);
      for (var i = 0; i < ufo.explosionSfx.length; i++) {
        expect(Object.prototype.toString.call(ufo.explosionSfx[i])).toBe("[object HTMLAudioElement]");
      }
    });
  });

  describe ("rendering", function() {
    it ("should have a render function", function() {
      expect(typeof ufo.render).toBe('function');
    });
    it ("render should have an arity of one", function() {
      expect(ufo.render.length).toEqual(1);
    });
    it ("ufo class should maintain a lastTick var", function() {
      expect(ufo.lastTick).toBeDefined();
    });
    it ("needs a 'tilt' defined", function() {
      expect(ufo.tilt).toBeDefined();
    });
  });

  describe("drawing", function() {
    it ("should have a draw function", function() {
      expect(typeof ufo.draw).toBe('function');
    });

    it ("draw function should accept one param (context)", function() {
      expect(ufo.draw.length).toEqual(1);
    });

    it ("should use context to drawImage", function() {
      var x = {
        drawImage: function() {},
       save: function() {},
       translate: function() {},
       rotate: function() {},
       restore: function() {},
      };
      ufo.allImagesLoaded = function() {
        return true;
      };
      spyOn(x, 'drawImage');
      ufo.draw(x);
      expect(x.drawImage).toHaveBeenCalled();
    });
  });

  describe("stateful stuff", function() {
    it ("should have a 'canvasWidth'", function() {
      expect(ufo.canvasWidth).toBeDefined();
    });
    it ("should have a 'canvasHeight'", function() {
      expect(ufo.canvasHeight).toBeDefined();
    });
    it ("should have an 'fps'", function() {
      expect(ufo.fps).toBeDefined();
    });
    it ("should have a 'movement' string", function() {
      expect(typeof ufo.movement).toBe("string");
    });
    it ("should have a 'speed' defined", function() {
      expect(ufo.speed).toBeDefined();
    });
  });

  describe("updateFrame", function() {
    beforeEach(function() {
      var cow = new Cow(0,0);
      var ufo = new Ufo(cow, 0, 0);
    });
    it ("should accept one parameter (time)", function() {
      expect(ufo.updateFrame.length).toEqual(1);
    });
    it ("should increment frame from 0 to 1 if time is greater than lastTick+fps", function() {
      ufo.frame = 0;
      ufo.lastTick = 0;
      ufo.fps = 5;
      ufo.updateFrame(25);
      expect(ufo.frame).toEqual(1);
    });
  });

  describe("setMovementBasedOnCow", function() {
    var cow;
    var ufo;
    var time;
    beforeEach(function() {
      cow = new Cow(0,0);
      ufo = new Ufo(cow, 0, 0);
      time = 12345;
    });
    it ("should exist", function() {
      expect(typeof ufo.setMovementBasedOnCow).toBe("function");
    });
    it ("should accept one parameter for time", function() {
      expect(ufo.setMovementBasedOnCow.length).toEqual(1);
    });
    it ("should not change movement if cow is not still", function() {
      ufo.movement = "something";
      ufo.targetCow = {
        movement: "notStill",
      };
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("something");
    });
    it ("should move left if targetCow.x+5 is less than ufo.x", function() {
      ufo.targetCow = { 
        x: 5,
       movement: "still",
      };
      ufo.x = 15;
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("left");
    });
    it ("should move right if ufo.x is less than targetCow.x-5", function() {
      ufo.targetCow = { 
        x: 15,
       movement: "still",
      };
      ufo.x = 5;
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("right");
    });
    it ("should keep still if x is within 5 of targetCow.x", function() {
      ufo.targetCow = { 
        x: 15,
       movement: "still",
      };
      ufo.x = 10;
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("still");
      ufo.targetCow = { 
        x: 15,
       movement: "still",
      };
      ufo.x = 20;
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("still");
    });
    it ("should set beamTick to time when it moves left", function() {
      ufo.targetCow = { 
        x: 5,
       movement: "still",
      };
      ufo.x = 15;
      expect(ufo.beamTick).not.toEqual(time);
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("left");
      expect(ufo.beamTick).toEqual(time);
    });
    it ("should set beamTick to time when it moves right", function() {
      ufo.targetCow = { 
        x: 15,
       movement: "still",
      };
      ufo.x = 5;
      expect(ufo.beamTick).not.toEqual(time);
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("right");
      expect(ufo.beamTick).toEqual(time);
    });
    it ("should set movement to beaming if time is greater than beamTick + beamDelay and beamTick not equal to 0", function() {
      ufo.targetCow = {
        x: 5,
       movement: "still",
      };
      ufo.x = 5;
      ufo.beamTick = 5;
      ufo.beamDelay = 5;
      expect(ufo.movement).toBe("still");
      ufo.setMovementBasedOnCow(time);
      expect(ufo.movement).toBe("beaming");
    });
  });

  describe("moveUfo", function() {
    beforeEach(function() {
      var cow = new Cow(0,0);
      var ufo = new Ufo(cow, 0, 0);
    });
    it ("should exist", function() {
      expect(typeof ufo.moveUfo).toBe("function");
    });
    it ("needs to accept one parameter, time", function() {
      expect(ufo.moveUfo.length).toEqual(1);
    });
    it ("tilt should be not-equal to zero when movement is either left or right", function() {
      ufo.movement = "left";
      ufo.moveUfo();
      expect(ufo.tilt).not.toBe(0);
      ufo.movement = "right";
      ufo.moveUfo();
      expect(ufo.tilt).not.toBe(0);
    });
    it ("should add ufo.speed to x if moving right", function() {
      var speed = ufo.speed;
      var x = ufo.x;
      ufo.movement = "right";
      ufo.moveUfo();
      expect(ufo.x).toEqual(x + speed);
    });
    it ("should minus ufo.speed from x if moving left", function() {
      var speed = ufo.speed;
      var x = ufo.x;
      ufo.movement = "left";
      ufo.moveUfo();
      expect(ufo.x).toEqual(x - speed);
    });
    it ("should set tilt to 0 if still", function() {
      ufo.tilt = 1235;
      ufo.movement = "still";
      ufo.moveUfo();
      expect(ufo.tilt).toEqual(0);
    });
  });

  describe("initX", function() {
    beforeEach(function() {
      var cow = new Cow(0, 0);
      var ufo = new Ufo(cow, 0, 0);
    });
    it ("should have an arity of 1", function() {
      expect(ufo.initX.length).toEqual(1);
    });
    it ("should return a num less than 0 or greater than canvasWidth", function() {
      var canvasWidth = 800;
      var x = ufo.initX(canvasWidth);
      var result;
      if (x < 0 || x > canvasWidth) {
        result = true;
      }
      else {
        result = false;
      }
    expect(result).toBe(true);
    });
  });

  describe("initY", function() {
    it ("should return a number between 0 and 200", function() {
      var y = ufo.initY();
      var result;
      if (y >= 0 && y <= 200) {
        result = true;
      }
      else {
        result = false;
      }
    expect(result).toBe(true);
    });
  });

  describe("explode", function() {
    it ("should exist as a function", function() {
      expect(typeof ufo.explode).toBe("function");
    });
    it ("should call ufoBeam.reset()", function() {
      var ufoBeam = {
        reset: function() {},
      };
      spyOn(ufoBeam, "reset");
      ufo.ufoBeam = ufoBeam;
      ufo.explode();
      expect(ufoBeam.reset).toHaveBeenCalled();
    });
  });

  describe("allImagesLoaded", function() {
    it ("should return true if all elements in this.frames have 'completed' set to true", function() {
      var img1 = {
        "complete": true,
      };
      var img2 = {
        "complete": true,
      };
      var frames = [img1, img2];
      ufo.frames = frames;
      var result = ufo.allImagesLoaded();
      expect(result).toBe(true);
    });
    it ("should return false if not all elements in this.frames have 'completed' set to true", function() {
      var img1 = {
        "complete": true,
      };
      var img2 = {
        "complete": false,
      };
      var frames = [img1, img2];
      ufo.frames = frames;
      var result = ufo.allImagesLoaded();
      expect(result).toBe(false);
    });
    it ("should set ufo.width and ufo.height if all images are complete, based on first frame", function() {
      var img1 = {
        "height": 300,
       "width": 200,
       "complete": true,
      };
      var img2 = {
        "complete": true,
      };
      var frames = [img1, img2];
      ufo.frames = frames;
      var result = ufo.allImagesLoaded();
      expect(result).toBe(true);
      expect(ufo.width).toBe(img1.width);
      expect(ufo.height).toBe(img1.height);
    });
  });

  describe("moveExplodingUfo", function() {
    it ("should make some changes to x and y if movement is left", function() {
      var x = ufo.x,
       y = ufo.y;
    ufo.movement = "left";
    ufo.moveExplodingUfo();
    expect(ufo.x).not.toBe(x);
    expect(ufo.y).not.toBe(y);
    });
    it ("should make some changes to x and y if movement is right", function() {
      var x = ufo.x,
       y = ufo.y;
    ufo.movement = "right";
    ufo.moveExplodingUfo();
    expect(ufo.x).not.toBe(x);
    expect(ufo.y).not.toBe(y);
    });
    it ("should change y for still movement", function() {
      var x = ufo.x;
      var y = ufo.y;
      ufo.movement = "still";
      ufo.moveExplodingUfo();
      expect(ufo.x).toEqual(x);
      expect(ufo.y).not.toEqual(y);
    });
    it ("should change y for beaming movement", function() {
      var x = ufo.x;
      var y = ufo.y;
      ufo.movement = "beaming";
      ufo.moveExplodingUfo();
      expect(ufo.x).toEqual(x);
      expect(ufo.y).not.toEqual(y);
    });
  });
});

