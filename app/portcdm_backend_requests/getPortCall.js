var http = require('http');
var options = require('./options.js');

//Fetches a port call, by specifing the port call id, from the back end
exports.getPortCall = function (portcallid, callback) {    
  "use strict";
  http.get(options.setOptions('/dmp/port_calls/' + portcallid + '/', 'GET', 'application/xml'), function(serverRes) {

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