var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


//Adds a new note to a port call
exports.insertNote = function(portcallid, note) {
	'use strict';
	mongo.connect(url, function(err,db){
		var myobj = {portcallid: portcallid, note: note};
		if (err) {
			console.log(err);
		}
		db.collection('notes').insertOne(myobj, function(err){
			assert.equal(null,err);
			db.close();
		});
	});
};