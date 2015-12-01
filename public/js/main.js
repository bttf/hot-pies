var game = {};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var add_event_listeners = function(game) {
  body.addEventListener("keydown", game.key_down.bind(game), false);
  body.addEventListener("keyup", game.key_up.bind(game), false);
  body.addEventListener("keypress", game.key_press.bind(game), false);
  body.addEventListener("mousedown", game.mouse_down.bind(game), false);
  body.addEventListener("mousemove", game.mousemove.bind(game), false);
};

var init_browser = function() {
  body = document.getElementsByTagName("body")[0];
  canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = window.innerWidth - 15;
  canvas.height = window.innerHeight - 25;
  //canvas.style.cursor = "none";
  context = canvas.getContext('2d');
  context.font = "16px Arial";
  context.fillStyle = "black";
  body.appendChild(canvas);
  horizon = (canvas.height / 2);
  center_axis = (canvas.width / 2);
  game = new Game(canvas.width, canvas.height);
  game.playMusic = true;
};

var init = function() {
  init_browser();
  //game.init(canvas.width, canvas.height);
  game.init(canvas);
  add_event_listeners(game);
};

var loop = function(time) {
  requestAnimFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(!game.pause)
    game.render(time);
  game.draw(context, time);
};

var start = function() {
  init();
  loop();
};

window.onload = start;

