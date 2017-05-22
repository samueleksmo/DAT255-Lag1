
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';



//Spara ett portCallid och köid i listan över våra anlöp
exports.insertOneItem= function(portcallid, queueid, vesselname) {
mongo.connect(url, function(err,db){
	myobj = {portCallId: portcallid, queueId: queueid, vesselName: vesselname};
	if (err) throw err;
	db.collection('ourportcalls').insertOne(myobj, function(err, result){
		assert.equal(null,err);
		db.close();
	});
});
 };

