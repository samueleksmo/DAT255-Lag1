var express = require('express');
var router = express.Router();
var http = require('http');

var portCallsRequest = require('../portcdm_backend_requests/getPortCalls.js');
var postRequest = require('../portcdm_backend_requests/postServiceState.js');

router.get('/favicon.ico', function(req, res) {
    res.send(204);
});

router.get('/', function(req, res){
  res.render('index', { portCalls: portCallsRequest.portCalls() });
});

router.get('/:id', function(req, res){
    	var options = {
           host: '192.168.56.101',
    	   port: 8080,
    	   path: '/dmp/port_calls/' + req.params.id + '/',
    	   method: 'GET',
    	   headers: {
    	       'X-PortCDM-Userid': 'viktoria',
    	       'X-PortCDM-Password': 'vik123',
    	       'X-PortCDM-APIKey': 'dhc',
    	       'Content-Type': 'application/xml'
    	   }
	   };

        http.get(options, function(serverRes) {

            var bodyChunks = [];   

            serverRes.on('data', function(chunk) {
                bodyChunks += chunk;
            });

            serverRes.on('end', function() {
                var body = JSON.parse(bodyChunks); 
                res.render('portcall', { portCall: body });
            });

    }); 

});

router.post('/:id', function(req, res){
    var datetime = new Date(req.body.datetime);
    //Change timezone from CET to UTC
    datetime.setHours(datetime.getHours() - 1);
    
    postRequest.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, datetime);
    res.redirect('/');
})

module.exports = router;
