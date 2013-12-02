function AI(canvasWidth, canvasHeight) {
  var ai = this,
      numOfCows = 8;
      numOfUfos = 7;

  this.ufos = [];
  this.cows = [];

  this.init = {
    "cows": function() {
      var x_padding = canvasWidth * .1;
      for (var i = 0; i < numOfCows; i++) {
        var x = Math.floor((Math.random() * (canvasWidth - (x_padding * 2)) + x_padding)),
            y = canvasHeight + (new Cow()).frames[0].height + (Math.floor(Math.random() * 50)),
            plusOrMinus = Math.random() < 0.5 ? -1 : 1,
            // target_x = x + (plusOrMinus * (Math.floor(Math.random() * canvasWidth))),
            target_x = Math.floor((Math.random() * (canvasWidth - (x_padding * 2)) + x_padding)),
            target_y = canvasHeight - (Math.floor(Math.random() * (canvasHeight * .1)) + (canvasHeight * .1));
        ai.cows.push(new Cow(x, y, target_x, target_y));
      }
    },
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
    "cows": function(time) {
      var thisCow;
      for (var i = 0; i < ai.cows.length; i++) {
        thisCow = ai.cows[i];
        if (thisCow.x < thisCow.target_x - 10) {
          if (thisCow.y > thisCow.target_y) {
            thisCow.movement = "up-right";
          }
          else {
            thisCow.movement = "right";
          }
        }
        else if (thisCow.x > thisCow.target_x + 10) {
          if (thisCow.y > thisCow.target_y) {
            thisCow.movement = "up-left";
          }
          else {
            thisCow.movement = "left";
          }
        }
        else if (thisCow.y > thisCow.target_y) {
          thisCow.movement = "up";
        }
        else { 
          thisCow.movement = "still";
        }
        thisCow.render(time);
      }
    },
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
    "cows": function(context) {
      for (var i = 0; i < ai.cows.length; i++) {
        ai.cows[i].draw(context);
      }
    },
    "ufos": {
      "attack": function(context) {
        for (var i = 0; i < ai.ufos.length; i++) {
          ai.ufos[i].draw(context);
        }
      },
    },
  };
}
