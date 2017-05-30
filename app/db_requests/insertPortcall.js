var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';



//Insert a port call id along with its queue id and vessel name in the database
exports.insertPortCall = function(portcallid, queueid, vesselname) {
	'use strict';
	mongo.connect(url, function(err,db){
		var myobj = {portcallid: portcallid, queueId: queueid, vesselName: vesselname};
		if (err){ 
			throw err;
		}
		db.collection('addedportcalls').insertOne(myobj, function(err){
			assert.equal(null,err);
			db.close();
		});
	});
};