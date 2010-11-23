var http = require('http');

var last = null;

var flukso = http.createClient(80, '172.22.36.113');

var readFlukso = setInterval(function () {
	var req = flukso.request('GET', '/sensor/efcbc518888e601c548cc4e1ef2fbbb8', {
		'Connection': 'keep-alive'
	});
	req.on('response', function (res) {
		var text = '';
		res.on('data', function (chunk) {
			text = text + chunk;
		});
		res.on('end', function () {
			var data = JSON.parse(text);
			var next = data[data.length - 1];
			if (!last || last[0] != next[0]) {
				last = next;
				console.log(last);
			}
		});
	});
	req.end();
}, 200);

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end("Foo.\r\n");
}).listen(8080);
