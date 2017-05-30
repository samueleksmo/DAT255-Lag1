var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

//Returns all the notes with the specified port call id from the database
exports.getNotes = function(portcallid, callback) {
  'use strict';
  var resultArray = [];
  mongo.connect(url, function(err,db){
    if (err){
      throw err;
    }
    var cursor = db.collection('notes').find({portcallid: portcallid});
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      var notesArray = [];
      var i;
      for (i = resultArray.length-1; i >= 0; i=i-1) {
        notesArray.push(resultArray[i].note);
      }
      callback(notesArray);  
    });
  });
};