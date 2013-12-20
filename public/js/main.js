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

var add_event_listeners = function() {
  body.addEventListener("keydown", key_down, false);
  body.addEventListener("keyup", key_up, false);
  body.addEventListener("keypress", key_press, false);
   body.addEventListener("mousedown", mouse_down, false);
  // body.addEventListener("mouseup", mouse_up, false);
  body.addEventListener("mousemove", mouse_move, false);
};

var key_down = function(e) {
  game.key_down(e);
};

var key_up = function(e) {
  game.key_up(e);
};

var key_press = function(e) {
  game.key_press(e);
};

var mouse_move = function(e) {
  game.mousemove(e);
};

var mouse_down = function(e) {
  game.mouse_down(e);
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
  add_event_listeners();
  horizon = (canvas.height / 2);
  center_axis = (canvas.width / 2);
  game = new Game(canvas.width, canvas.height);
};

var init = function() {
  init_browser();
  game.init(canvas.width, canvas.height);
};

var loop = function(time) {
  requestAnimFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.render(time);
  game.draw(context, time);
};

var start = function() {
  init();
  loop();
};

window.onload = start;

