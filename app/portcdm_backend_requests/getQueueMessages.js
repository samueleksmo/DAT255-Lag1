var http = require('http');
var options = require('./options.js');

//Fetches messages from a queue by specifing the queue id
exports.getQueueMessages = function(qid, callback) {


	var req = http.get(options.setOptions('/mb/mqs/'+ qid, 'GET', 'application/xml'), function(res) {

		var bodyChunks = [];

		res.on('data', function(chunk) {
    		bodyChunks += chunk;
		});

		res.on('end', function() {
    		callback(bodyChunks);
		});

   });

};