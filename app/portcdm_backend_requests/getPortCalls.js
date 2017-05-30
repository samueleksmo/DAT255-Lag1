var http = require("http");
var options = require('./options.js');

//Fetches the latest 30 port calls from the backend
exports.getPortCalls = function(callback) {
	"use strict";
  http.get(options.setOptions('/dmp/port_calls/', 'GET', 'application/xml'), function(res) {

  	var bodyChunks = [];

	  res.on('data', function(chunk) {
    	bodyChunks += chunk;
  	});

		res.on('end', function() {
  		var body = JSON.parse(bodyChunks);
  		callback(body);
    });

	});
};