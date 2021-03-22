const http = require('http');
const url = require('url');
const fs = require('fs');

http
	.createServer((req, res) => {
		if (req.url === '/') {
			fs.readFile('index.html', (err, data) => {
				if (err) {
					res.writeHead(404, { 'Content-Type': 'text/html' });
					return res.end('404: Not Found');
				}
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(data);
				return res.end();
			});
		} else if (req.url === '/about.html' || req.url === '/contact-me.html') {
			const q = url.parse(req.url, true);
			const filename = '.' + q.pathname;
			fs.readFile(filename, (err, data) => {
				if (err) {
					res.writeHead(404, { 'Content-Type': 'text/html' });
					return res.end('404: Not Found');
				}
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(data);
				return res.end();
			});
		} else {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			return res.end('404: Not Found');
		}
	})
	.listen(8080);
