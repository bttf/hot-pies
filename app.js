var port = 8000;
var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app);
var engines = require('consolidate');
var path = require('path');

server.listen(port);
console.log("Lets have a listen on port "+ port + "...");

app.enable('trust proxy');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/test', function(req, res) {
  res.render('SpecRunner');
});

