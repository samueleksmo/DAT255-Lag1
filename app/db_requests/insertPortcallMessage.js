var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


//Adds a new port call message associated with a specified port call id in the database
exports.insertPortCallMessage = function(portcallid, portcallmessage) {
	'use strict';
	mongo.connect(url, function(err,db){
		var myobj = { portcallid: portcallid, portcallmessage: portcallmessage };
		if (err) {
			console.log(err);
		}
		db.collection('portcallmessages').insertOne(myobj, function(err){
			assert.equal(null,err);
			db.close();
		});
	});
};