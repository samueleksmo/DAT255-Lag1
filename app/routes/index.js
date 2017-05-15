var express = require('express');
var router = express.Router();
var http = require('http');

var portCallsRequest = require('../portcdm_backend_requests/getPortCalls.js');
var postServiceState = require('../portcdm_backend_requests/postServiceState.js');
var postLocationState = require('../portcdm_backend_requests/postLocationState.js');

router.get('/favicon.ico', function(req, res) {
    res.send(204);
});

router.get('/', function(req, res){
  res.render('index', { portCalls: portCallsRequest.portCalls() });
});

router.get('/:id', function(req, res){
    	var options = {
           host: 'dev.portcdm.eu',
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
    datetime.setHours(datetime.getHours() - 2);
    
    if (req.body.state == 'serviceState') {
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, datetime, req.body.serviceObject, 
            req.body.timeSequence, req.body.berth);
        if (req.body.serviceObject == 'SLOP_OPERATION')
            postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, datetime, req.body.serviceObject, 
                'REQUEST_RECEIVED', req.body.berth);
    }          
    else if (req.body.state == 'locationState')
        postLocationState.postLocationState(req.params.id, req.body.vesselId, req.body.timeType, datetime, 
                req.body.arrOrDep, req.body.berth);
    res.redirect('/');
})

module.exports = router;
