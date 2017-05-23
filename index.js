/*// me Ctrl + c e nal serverin n CMD
const router = require('./router.js');
const http = require('http');

http.createServer(function(request, response) {

	router.home(request, response);
	router.user(request, response);

}).listen(3000);

console.log('Server running at localhost:3000');
*/
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});