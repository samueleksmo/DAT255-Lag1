
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

//skicka med portcallid, köid returneras i callbackfunktion
exports.getQueueId = function(portcallid, callback) {
 mongo.connect(url, function(err,db){
 	if (err) throw err;
	db.collection('ourportcalls').findOne({portCallId : portcallid}, function(err,doc){
		callback(doc.queueId);
		db.close();
	});
  });
};