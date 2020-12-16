const http = require('http'),
    port = process.env.PORT || 3000;
    

const httpServer = http.createServer((req, res) => {
	console.log(new Date() + ' Received request for ' + req.url); //remove in production
	res.writeHead(404);
	res.end();
});

httpServer.listen(port, () => {
	console.log(new Date() + ' Server is listening on port', port);
});

module.exports = { httpServer };
