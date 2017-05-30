var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';

//Returns the queue id associated with the specified port call id
exports.getQueueId = function(portcallid, callback) {
	'use strict';
	mongo.connect(url, function(err,db){
		if(err){
			console.log(err);
		}
		db.collection('addedportcalls').findOne({portcallid : portcallid}, function(err, doc){
			if(err){
				console.log(err);
			}
			callback(doc.queueId);
			db.close();
		});
  	});
};