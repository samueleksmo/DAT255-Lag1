var http = require("http");
var options = require('./options.js');

exports.portCall30 = function(callback) {
	var req = http.get(options.setOptions('/dmp/port_calls/', 'GET', 'application/xml'), function(res) {

  		var bodyChunks = [];

		res.on('data', function(chunk) {
    		bodyChunks += chunk;
  		});

  		res.on('end', function() {
    		var body = JSON.parse(bodyChunks);
    		callback(body)
		});

	});
};