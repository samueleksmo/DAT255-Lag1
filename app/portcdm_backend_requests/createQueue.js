var http = require('http');
var options = require('./options.js');

//Skapar ny kö genom att skcika med ett portCallId, returnerar ett queueId
exports.newQueue = function(pId, callback) {
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