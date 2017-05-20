var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

var portCallRequest = require('../portcdm_backend_requests/getPortCall.js'); 
var postServiceState = require('../portcdm_backend_requests/postServiceState.js');
var postLocationState = require('../portcdm_backend_requests/postLocationState.js');
var createQueue = require('../portcdm_backend_requests/createQueue.js');
var getQueueMessages = require('../portcdm_backend_requests/getQueueMessages.js');
var getPortCalls = require('../db_requests/getOurPortcalls.js');
var insertPortCall = require('../db_requests/insertNewPortcall.js');
var getQueueId = require('../db_requests/getQueueId.js');
var portCall30Request = require('../portcdm_backend_requests/getPortCall30.js');


router.get('/favicon.ico', function(req, res) {
    res.send(204);
});

router.get('/', function(req, res){
  portCall30Request.portCall30(function(body1){
  getPortCalls.getAllOurPortcalls(function(body2){
    res.render('index', { portCalls30: body1, portCalls: body2 });    
  });
  });
});

router.post('/', function(req, res){
    createQueue.newQueue(req.body.pid, function(qid){
        insertPortCall.insertOneItem(req.body.pid, qid);
    })
    res.redirect('/');
});

router.get('/:id', function(req, res){
    
    portCallRequest.portCall(req.params.id, function(portCallBody) {
            getQueueId.getQueueId(req.params.id, function(queueId){
                getQueueMessages.newQueueMessages(queueId, function(xmlMessages){
                    queueMessagesToJs(xmlMessages, function(jsonMessages) {
                        res.render('portcall', { portCall: portCallBody, messages: jsonMessages });
                    })
                })
            })
        })
});
    

router.post('/:id', function(req, res){
    var datetime = new Date(req.body.datetime);
    //Change timezone from CET to UTC
    datetime.setHours(datetime.getHours() - 2);
    

    if (req.body.serviceObject == 'SLOP_OPERATION') {
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, new Date(), req.body.serviceObject, 
            'REQUEST_RECEIVED', req.body.berth);
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, new Date(), req.body.serviceObject, 
            req.body.timeSequence, req.body.berth);
    } 

    else if (req.body.state == 'serviceState')
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, datetime, req.body.serviceObject, 
            req.body.timeSequence, req.body.berth);

    else if (req.body.state == 'locationState')
        postLocationState.postLocationState(req.params.id, req.body.vesselId, req.body.timeType, datetime, 
                req.body.serviceObject, req.body.berth);
    
    res.redirect('/' + req.params.id);
})

//Turn xml messages from the queue into js
function queueMessagesToJs(xml, callback) {
    
    var xmlSlice = xml.slice(120, -13);  
    var result = [];
    
    while (xmlSlice !== "") {
        parseString(xmlSlice, function (err, result1) {
            result.push(result1);     
        });

        xmlSlice = xmlSlice.slice(xmlSlice.indexOf('</ns2:portCallMessage>') + '</ns2:portCallMessage>'.length);

    }
callback(result);
}

module.exports = router;
