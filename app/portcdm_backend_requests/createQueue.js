var http = require("http");


//Skapar ny kö genom att skicka med ett portCallId, returnerar ett queueId i callbackfunktionen
exports.newQueue = function(id, callback) {
var body = '[' +
  '{' +
    '"type": "PORT_CALL",' +
    '"element": "' + id +
    '"}'+
  ']';

var options = {
    host: 'dev.portcdm.eu',
    port: 8080,
    path: '/mb/mqs/',
    method: 'POST',
    headers: {
        'X-PortCDM-Userid': 'viktoria',
        'X-PortCDM-Password': 'vik123',
        'X-PortCDM-APIKey': 'dhc',
        'Content-Type': 'application/JSON'
  }
};


var req = http.request(options, function(serverRes){   
    var bodyChunks = [];
    console.log(serverRes.statusCode);
    serverRes.on('data', function(chunk) {
      bodyChunks += chunk;
      callback(bodyChunks);
    });
});
  req.write(body);
  req.end();

};
