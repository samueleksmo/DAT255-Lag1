var express = require('express');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

exports.getPCM = function(portcallid, callback) {
 var resultArray = [];
 mongo.connect(url, function(err,db){
  if (err) throw err;
  var cursor = db.collection('portcallmessages').find({portcallid: portcallid});
  cursor.forEach(function(doc, err) {
    assert.equal(null, err);
    resultArray.push(doc);
  }, function() {
    db.close();
    var pcmArray = [];
    for (var i = resultArray.length-1; i >= 0; i--) {
      pcmArray.push(resultArray[i].portcallmessage)
    }
    callback(pcmArray);  
  })
 })
    }