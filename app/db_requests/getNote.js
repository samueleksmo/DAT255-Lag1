
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

exports.getNote = function(portcallid, callback) {
 var resultArray = [];
 mongo.connect(url, function(err,db){
  if (err) throw err;
  var cursor = db.collection('notes').find({portcallid: portcallid});
  cursor.forEach(function(doc, err) {
    assert.equal(null, err);
    resultArray.push(doc);
  }, function() {
    db.close();
    var notesArray = [];
    for (var i = resultArray.length-1; i >= 0; i--) {
      notesArray.push(resultArray[i].note)
    }
    callback(notesArray);  
  })
 })
    }