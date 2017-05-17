var http = require('http');
const uuidV4 = require('uuid/v4');
var options = require('./options.js');

exports.postServiceState = function(portCallId, vesselId, timeType, datetime, serviceObject, timeSequence, berth) {

var date = new Date();
date.setHours(date.getHours - 2);

var body = '<?xml version="1.0" encoding="UTF-8"?>' +
'<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
   '<ns2:portCallId>' + portCallId + '</ns2:portCallId>' +
   '<ns2:vesselId>' + vesselId + '</ns2:vesselId>' +
   '<ns2:messageId>urn:x-mrn:stm:portcdm:message:' + uuidV4() + '</ns2:messageId>' +
   //Ska vara nutid
   '<ns2:reportedAt>' + date + '</ns2:reportedAt>' +
   '<ns2:serviceState>' +
      '<ns2:serviceObject>' + serviceObject + '</ns2:serviceObject>' +
      '<ns2:timeSequence>' + timeSequence + '</ns2:timeSequence>' +
      '<ns2:time>' + datetime.toISOString() + '</ns2:time>' +
      '<ns2:timeType>' + timeType + '</ns2:timeType>' +
      '<ns2:at>' +
        '<ns2:locationType>BERTH</ns2:locationType>' +
        '<ns2:name>' + berth + '</ns2:name>' +
      '</ns2:at>' +
   '</ns2:serviceState>' +
'</ns2:portCallMessage>';

var req = http.request(options.setOptions('/dmp/mss/state_update', 'POST', 'application/xml'), function(res)    {
    console.log(res.statusCode);
    console.log(res.statusMessage);
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(body);
req.end();

};