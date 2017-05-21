var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';



exports.insertOneItem = function(portcallid, portcallmessage) {
mongo.connect(url, function(err,db){
	myobj = { portcallid: portcallid, portcallmessage: portcallmessage };
	if (err) throw err;
	db.collection('portcallmessages').insertOne(myobj, function(err, result){
		assert.equal(null,err);
		db.close();
	});
});
};