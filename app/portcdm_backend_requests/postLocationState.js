var http = require('http');
var uuidV4 = require('uuid/v4');

function arrivalOrDeparture(arrOrDep, berth) {
  if (arrOrDep == 'ARRIVAL') {
    return '<ns2:arrivalLocation>' +
      '<ns2:to>' + 
        '<ns2:locationType>BERTH</ns2:locationType>' +
        '<ns2:name>' + berth + '</ns2:name>' +
      '</ns2:to>' +
    '</ns2:arrivalLocation>'
  } else {
    return '<ns2:departureLocation>' +
      '<ns2:from>' + 
        '<ns2:locationType>BERTH</ns2:locationType>' +
        '<ns2:name>' + berth + '</ns2:name>' +
      '</ns2:from>' +
    '</ns2:departureLocation>'
  }
}


exports.postLocationState = function(portCallId, vesselId, timeType, datetime, arrOrDep, berth) {
var d = new Date();
d.setHours(d.getHours - 2);
var body = '<?xml version="1.0" encoding="UTF-8"?>' +
'<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
   '<ns2:portCallId>' + portCallId + '</ns2:portCallId>' +
   '<ns2:vesselId>' + vesselId + '</ns2:vesselId>' +
   '<ns2:messageId>urn:x-mrn:stm:portcdm:message:' + uuidV4() + '</ns2:messageId>' +
   //Ska vara nutid
   '<ns2:reportedAt>2017-03-01T11:59:44.4935008Z</ns2:reportedAt>' +
   '<ns2:locationState>' +
      '<ns2:time>' + datetime.toISOString() + '</ns2:time>' +
      '<ns2:timeType>' + timeType + '</ns2:timeType>' +
      '<ns2:referenceObject>VESSEL</ns2:referenceObject>' +
      arrivalOrDeparture(arrOrDep, berth) + 
   '</ns2:locationState>' +
'</ns2:portCallMessage>';
console.log(body);
var options = {
    host: 'dev.portcdm.eu',
    path: '/dmp/mss/state_update',
    port: 8080,
    method: 'POST',
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