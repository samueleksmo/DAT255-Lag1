
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


//Tar bort ett portCall, ge portcallid som sträng i metodanrop
exports.deleteOneItem= function(query) {
  mongo.connect(url, function(err,db){
	if (err) throw err;
  	var myquery = { portCallId: query };
  	db.collection('ourportcalls').remove(myquery, function(err, obj) {
    	if (err) throw err;
    	console.log(obj.result.n + ' document(s) deleted');
    	db.close();
	});
  });
};