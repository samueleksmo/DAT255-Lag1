
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

//Returns the queue id associated with the specified port call id
exports.getQueueId = function(portcallid, callback) {
	mongo.connect(url, function(err,db){
 		if (err) throw err;
		db.collection('addedportcalls').findOne({portcallid : portcallid}, function(err,doc){
			callback(doc.queueId);
			db.close();
		});
  	});
};