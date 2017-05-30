var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

//Returns all port call messages associated with the specified port call id from the database
exports.getPortCallMessages = function(portcallid, callback) {
  'use strict';
  var resultArray = [];
  mongo.connect(url, function(err,db){
    if (err){
      console.log(err);
    }
    var cursor = db.collection('portcallmessages').find({portcallid: portcallid});
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      var pcmArray = [];
      var i; 
      for (i= resultArray.length-1; i >= 0; i = i-1) {
        pcmArray.push(resultArray[i].portcallmessage);
      }
      callback(pcmArray);  
    });
  });
};