var http = require("http");
var index = require('../routes/index.js');

exports.portCall = function (portCallId, callback) {    
  var options = {
    host: 'dev.portcdm.eu',
    port: 8080,
    path: '/dmp/port_calls/' + portCallId + '/',
    method: 'GET',
    headers: {
      'X-PortCDM-Userid': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': 'application/xml'
    }
  };

  http.get(options, function(serverRes) {

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