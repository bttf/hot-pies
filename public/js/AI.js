function AI(canvasWidth, canvasHeight) {
  var numOfUfos = 7;

  this.init = {
    "ufos": {
      "attack": function() {
        var x, y;
        for (var i = 0; i < numOfUfos; i++) {
          if (i % 2 == 0) {
            //x = canvasWidth + ((new Ufo()).frames[0].width) * 2;
            x = 255;
          }
          else {
            //x = -((new Ufo()).frames[0].width) * 2;
            x = 255;
          }
          y = Math.floor(Math.random * 400) + 25;
          console.log(this);
          ufos.push(new Ufo(x, y));
        }
      },
    },
  };

  this.render = {
    "ufos": {
      "attack": {
      },
    },
  };

  this.draw = {
    "ufos": {
      "attack": {
      },
    },
  };
}

AI.prototype.ufos = [];

