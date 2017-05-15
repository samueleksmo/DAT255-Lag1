var http = require("http");

//hämtar meddelanden för en viss kö, genom att skicka med queueId för ett visst anlöp
exports.newQueueMessages = function(id) {
var options = {
    host: 'dev.portcdm.eu',
    port: 8080,
    path: '/mb/mqs/'+ id,
    method: 'GET',
    headers: {
        'X-PortCDM-Userid': 'viktoria',
        'X-PortCDM-Password': 'vik123',
        'X-PortCDM-APIKey': 'dhc',
    }
};


var req = http.get(options, function(res) {

  var bodyChunks = [];

  res.on('data', function(chunk) {

    bodyChunks += chunk;

  });

  res.on('end', function() {
    
    
      console.log(bodyChunks);
      return bodyChunks;
    });

   });

};