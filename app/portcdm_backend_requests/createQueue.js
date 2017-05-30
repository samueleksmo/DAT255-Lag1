var http = require('http');
var options = require('./options.js');

//Creates a new queue, filtered by a specified port call id, add returns a queue id
exports.newQueue = function(pId, callback) {
  "use strict";
  var body = '[' +
    '{' +
      '"type": "PORT_CALL",' +
      '"element": "' + pId +
    '"}'+
  ']';

  var req = http.request(options.setOptions('/mb/mqs/?fromTime=2017-05-21T14:20:21Z', 'POST', 'application/json'), function(res) {
    var bodyChunks = [];
    console.log(res.statusCode);
    
    res.on('data', function(chunk) {
      bodyChunks += chunk;
    });

    res.on('end', function() { 
      callback(bodyChunks);
    });

  });

  req.write(body);
  req.end();

};