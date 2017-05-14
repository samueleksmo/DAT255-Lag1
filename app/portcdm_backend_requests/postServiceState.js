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

function etaOrAta(timeType) {
  if (timeType == 'ETA') {
    return 'ESTIMATED';
  } else {
    return 'ACTUAL';
  }
}

exports.postServiceState = function(portCallId, vesselId, timeType, datetime) {
console.log(portCallId);
console.log(vesselId);
var body = '<?xml version="1.0" encoding="UTF-8"?>' +
'<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
   '<ns2:portCallId>' + portCallId + '</ns2:portCallId>' +
   '<ns2:vesselId>' + vesselId + '</ns2:vesselId>' +
   '<ns2:messageId>urn:x-mrn:stm:portcdm:message:' + guid() + '</ns2:messageId>' +
   '<ns2:reportedAt>2017-03-01T11:59:44.4935008Z</ns2:reportedAt>' +
   '<ns2:serviceState>' +
      '<ns2:serviceObject>SLUDGE_OPERATION</ns2:serviceObject>' +
      '<ns2:timeSequence>COMMENCED</ns2:timeSequence>' +
      '<ns2:time>' + datetime.toISOString() + '</ns2:time>' +
      '<ns2:timeType>' + etaOrAta(timeType) + '</ns2:timeType>' +
      '<ns2:at>' +
        '<ns2:locationType>BERTH</ns2:locationType>' +
      '</ns2:at>' +
   '</ns2:serviceState>' +
'</ns2:portCallMessage>';
console.log(body);
var options = {
    host: '192.168.56.101',
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