var http = require('http');
var uuidV4 = require('uuid/v4');
var options = require('./options.js');

function arrivalOrDeparture(arrOrDep, berth) {
  if (arrOrDep === 'ARRIVAL') {
    return '<ns2:arrivalLocation>' +
      '<ns2:to>' + 
        '<ns2:locationType>BERTH</ns2:locationType>' +
        '<ns2:name>' + berth + '</ns2:name>' +
      '</ns2:to>' +
    '</ns2:arrivalLocation>';
  } else {
    return '<ns2:departureLocation>' +
      '<ns2:from>' + 
        '<ns2:locationType>BERTH</ns2:locationType>' +
        '<ns2:name>' + berth + '</ns2:name>' +
      '</ns2:from>' +
    '</ns2:departureLocation>';
  }
  
}


exports.postLocationState = function(portCallId, vesselId, timeType, datetime, arrOrDep, berth) {
var date = new Date();
date.setHours(date.getHours - 2);
var body = '<?xml version="1.0" encoding="UTF-8"?>' +
'<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
   '<ns2:portCallId>' + portCallId + '</ns2:portCallId>' +
   '<ns2:vesselId>' + vesselId + '</ns2:vesselId>' +
   '<ns2:messageId>urn:x-mrn:stm:portcdm:message:' + uuidV4() + '</ns2:messageId>' +
   '<ns2:reportedAt>' + date + '</ns2:reportedAt>' +
   '<ns2:locationState>' +
      '<ns2:time>' + datetime.toISOString() + '</ns2:time>' +
      '<ns2:timeType>' + timeType + '</ns2:timeType>' +
      '<ns2:referenceObject>VESSEL</ns2:referenceObject>' +
      arrivalOrDeparture(arrOrDep, berth) + 
   '</ns2:locationState>' +
'</ns2:portCallMessage>';
console.log(body);

var req = http.request(options.setOptions('/dmp/mss/state_update', 'POST', 'application/xml'), function(res)    {
    console.log(res.statusCode);
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(body);
req.end();

};