/*// me Ctrl + c e nal serverin n CMD
const http = require('http');


console.log('Server running at localhost:3000');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
*/
const router = require('./router.js');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(request, response) {

	router.home(request, response);
	router.user(request, response);

});

/*server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on', server.address().port);
});