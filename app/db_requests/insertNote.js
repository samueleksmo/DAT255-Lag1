var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


exports.insertOneItem = function(portcallid, note) {
	mongo.connect(url, function(err,db){
		myobj = {portcallid: portcallid, note: note};
		if (err) throw err;
		db.collection('notes').insertOne(myobj, function(err, result){
			assert.equal(null,err);
			db.close();
		});
	});
};