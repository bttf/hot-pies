function AI(canvasWidth, canvasHeight) {
  var ai = this,
      numOfUfos = 7;

  this.ufos = [];

  this.init = {
    "ufos": {
      "attack": function() {
        var x, y;
        for (var i = 0; i < numOfUfos; i++) {
          if (i % 2 == 0) {
            x = canvasWidth + ((new Ufo()).frames[0].width) * 2;
          }
          else {
            x = -((new Ufo()).frames[0].width) * 2;
          }
          y = Math.floor(Math.random() * 200);
          ai.ufos.push(new Ufo(x, y));
          ai.ufos[i].target_x = Math.floor(Math.random() * (canvasWidth - ai.ufos[i].frames[0].width)) + 25;
        }
      },
    },
  };

  this.render = {
    "ufos": {
      "lastTick": 0,
      "attack": function(time) {
        var all_still = true;
        for (var i = 0; i < ai.ufos.length; i++) {
          if (ai.ufos[i].x < ai.ufos[i].target_x - 10) {
            ai.ufos[i].movement = "right";
            all_still = false;
          }
          else if (ai.ufos[i].x > ai.ufos[i].target_x + 10) {
            ai.ufos[i].movement = "left";
            all_still = false;
          }
          else {
            ai.ufos[i].movement = "still";
          }
        }
        if (all_still) {
          for (var i = 0; i < ai.ufos.length; i++) {
            if (time > (this.lastTick + 1000)) {
              ai.ufos[i].movement = "beaming";
            }
            ai.ufos[i].render(time);
          }
        }
        else {
          this.lastTick = time;
          for (var i = 0; i < ai.ufos.length; i++) {
            ai.ufos[i].render(time);
          }
        }
      },
    },
  };

  this.draw = {
    "ufos": {
      "attack": function(context) {
        for (var i = 0; i < ai.ufos.length; i++) {
          ai.ufos[i].draw(context);
        }
      },
    },
  };
}
