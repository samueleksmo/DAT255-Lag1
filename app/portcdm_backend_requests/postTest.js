var http = require('http');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

exports.postTestAmss = function(vesselId) {
var body = '<?xml version="1.0" encoding="UTF-8"?>' +
'<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
   '<ns2:vesselId>' + vesselId + '</ns2:vesselId>' +
   '<ns2:messageId>urn:mrn:stm:portcdm:message:' + guid() + '</ns2:messageId>' +
   '<ns2:reportedAt>2017-03-21T11:59:44.4935008Z</ns2:reportedAt>' +
   '<ns2:locationState>' +
      '<ns2:referenceObject>VESSEL</ns2:referenceObject>' +
      '<ns2:time>2017-03-03T13:00:00.0000000</ns2:time>' +
      '<ns2:timeType>ESTIMATED</ns2:timeType>' +
      '<ns2:arrivalLocation>' +
         '<ns2:to>' +
            '<ns2:locationType>BERTH</ns2:locationType>' +
            '<ns2:position>' +
               '<ns2:latitude>40.8360036457285</ns2:latitude>' +
               '<ns2:longitude>14.2670000001591</ns2:longitude>' +
            '</ns2:position>' +
         '</ns2:to>' +
      '</ns2:arrivalLocation>' +
   '</ns2:locationState>' +
'</ns2:portCallMessage>';

var options = {
    host: '192.168.56.101',
    path: '/amss/state_update',
    port: 8080,
    method: "POST",
    headers: {
        'X-PortCDM-Userid': 'viktoria',
        'X-PortCDM-Password': 'vik123',
        'X-PortCDM-APIKey': 'dhc',
        'Content-Type': 'application/xml'
    }
};

var req = http.request(options, function(res)    {
    console.log(res.statusCode);
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(body);
req.end();

}