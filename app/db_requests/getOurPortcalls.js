var express = require('express');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


//returnerar allt från collection med våra anlöp genom en callbackfunktion
exports.getAllOurPortcalls= function(callback) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('ourportcalls').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      callback(resultArray);
    });
  });
};




