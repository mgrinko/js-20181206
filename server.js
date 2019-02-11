var http = require('http');
var static = require('node-static');
var file = new static.Server('./public');

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(8080);

console.log('Open http://localhost:8080');
