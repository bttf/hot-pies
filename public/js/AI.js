function AI(canvasWidth, canvasHeight) {
  var ai = this,
      numOfCows = 1;
      numOfUfos = 7;

  this.ufos = [];
  this.cows = [];

  this.init = {
    "cows": function() {
      var x_padding = canvasWidth * .1;

      for (var i = 0; i < numOfCows; i++) {
        var x           = Math.floor((Math.random() * (canvasWidth - (x_padding * 2)) + x_padding)),
            y           = canvasHeight + Math.floor(Math.random() + 20);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1,
            target_x    = x + (plusOrMinus * 100);
            target_y    = canvasHeight - (Math.floor(Math.random() * 100) + 46);

        ai.cows.push(new Cow(x, y, target_x, target_y));
      }
    },
    "ufos": function(cow) {
      var x, y;
      for (var i = 0; i < numOfUfos; i++) {
        if (i % 2 == 0) {
          x = canvasWidth + ((new Ufo()).frames[0].width) * 2;
        }
        else {
          x = -((new Ufo()).frames[0].width) * 2;
        }
        y = Math.floor(Math.random() * 200);
        ai.ufos.push(new Ufo(x, y, cow));
      }
    },
  };

  this.render = {
    "cows": function(time) {
      for (var i = 0; i < ai.cows.length; i++) {
        ai.setCowMovement(ai.cows[i]);
        ai.cows[i].render(time);
      }
    },
    "ufos": function(time) {
      for (var i = 0; i < ai.ufos.length; i++) {
        ai.setUfoMovement(ai.ufos[i]);
        ai.ufos[i].render(time);
      }
    },
  };

  this.draw = {
    "cows": function(context) {
      for (var i = 0; i < ai.cows.length; i++) {
        ai.cows[i].draw(context);
      }
    },
    "ufos": function(context) {
      for (var i = 0; i < ai.ufos.length; i++) {
        ai.ufos[i].draw(context);
      }
    },
  };
}

AI.prototype.setUfoMovement = function(ufo) {
};

AI.prototype.setCowMovement = function(cow) {
  if (cow.x < cow.target_x - 5) {
    if (cow.y > cow.target_y) {
      cow.movement = "up-right";
    }
    else {
      cow.movement = "right";
    }
  }
  else if (cow.x > cow.target_x + 5) {
    if (cow.y > cow.target_y) {
      cow.movement = "up-left";
    }
    else {
      cow.movement = "left";
    }
  }
  else if (cow.y > cow.target_y) {
    cow.movement = "up";
  }
  else { 
    cow.movement = "still";
  }
};
