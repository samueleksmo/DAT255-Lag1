/*jslint es6 */
var http = require('http');
const uuidV4 = require('uuid/v4');
var options = require('./options.js');

//Posts a service state to the back end
exports.newServiceState = function(portCallId, vesselId, timeType, datetime, serviceObject, timeSequence, berth, comment) {
  "use strict";
  var d = new Date();
  d.setHours(d.getHours());
  var body = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
     '<ns2:portCallId>'+portCallId+'</ns2:portCallId>' +
     '<ns2:vesselId>'+vesselId+'</ns2:vesselId>' +
     '<ns2:messageId>urn:mrn:stm:portcdm:message:' + uuidV4() + '</ns2:messageId>' +
     '<ns2:reportedAt>'+d.toISOString()+'</ns2:reportedAt>' +
     '<ns2:reportedBy> Terminal 1 SiljaLine </ns2:reportedBy>' +
     '<ns2:comment>' +comment+ '</ns2:comment>' +
     '<ns2:serviceState>' +
        '<ns2:serviceObject>'+ serviceObject +'</ns2:serviceObject>' +
        '<ns2:timeSequence>' + timeSequence + '</ns2:timeSequence>' +
        '<ns2:time>' + datetime.toISOString() + '</ns2:time>' +
        '<ns2:timeType>' + timeType + '</ns2:timeType>' +
        '<ns2:at>' +
          '<ns2:locationMRN>urn:mrn:stm:location:segot:BERTH:'+berth+'</ns2:locationMRN>' +
        '</ns2:at>' +
     '</ns2:serviceState>' +
  '</ns2:portCallMessage>';


  var req = http.request(options.setOptions('/mb/mss', 'POST', 'application/xml'), function(res)    {
      console.log(res.statusCode);
      console.log(res.statusMessage);
  });

  req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
  });

  req.write(body);
  req.end();

};