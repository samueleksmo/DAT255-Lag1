var http = require('http');
var options = require('./options.js');

//hämtar meddelanden för en viss kö, genom att skicka med queueId för ett visst anlöp
exports.newQueueMessages = function(qId, callback) {


var req = http.get(options.setOptions('/mb/mqs/'+ qId, 'GET', 'application/xml'), function(res) {

  var bodyChunks = [];

  res.on('data', function(chunk) {

    bodyChunks += chunk;

  });

  res.on('end', function() {
    
      callback(bodyChunks);

    });

   });

};