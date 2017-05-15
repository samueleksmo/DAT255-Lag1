var http = require("http");

//Skapar ny kö genom att skcika med ett portCallId, returnerar ett queueId
exports.newQueue = function(id) {
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

var req = http.request(options, function(res) {
    var bodyChunks = [];
    console.log(res.statusCode);
    res.on('data', function(chunk) {
    bodyChunks += chunk;
    return bodyChunks;
  });

  });

req.write(body);
req.end();
};