var http = require("http");

var options = {
    host: '192.168.56.101',
    port: 8080,
    path: '/dmp/port_calls/',
    method: 'GET',
    headers: {
        'X-PortCDM-Userid': 'viktoria',
        'X-PortCDM-Password': 'vik123',
        'X-PortCDM-APIKey': 'dhc',
        'Content-Type': 'application/xml'
    }
};

var req = http.get(options, function(res) {

  var bodyChunks = [];

  res.on('data', function(chunk) {

    bodyChunks += chunk;

  });

  res.on('end', function() {
    
    var body = JSON.parse(bodyChunks);
    
    exports.portCalls = function() {
      return body;
    };

   });

});