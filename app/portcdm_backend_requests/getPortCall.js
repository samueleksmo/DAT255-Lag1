var http = require('http');
var index = require('../routes/index.js');
var options = require('./options.js');

exports.portCall = function (portCallId, callback) {    

  http.get(options.setOptions('/dmp/port_calls/' + portCallId + '/', 'GET', 'application/xml'), function(serverRes) {

    var bodyChunks = [];   

    serverRes.on('data', function(chunk) {
      bodyChunks += chunk;
    });

    serverRes.on('end', function() {
      var body = JSON.parse(bodyChunks); 
      callback(body);
    });
  }); 
};