var express = require('express');
var router = express.Router();
var http = require('http');

var portCallsRequest = require('../portcdm_backend_requests/getPortCalls.js');
var portCallRequest = require('../portcdm_backend_requests/getPortCall.js'); 
var postServiceState = require('../portcdm_backend_requests/postServiceState.js');
var postLocationState = require('../portcdm_backend_requests/postLocationState.js');
var createQueue = require('../portcdm_backend_requests/createQueue.js');
var getQueueMessage = require('../portcdm_backend_requests/getQueueMessage.js');
var getPortCalls = require('../db_requests/getOurPortcall.js');
var insertPortCall = require('../db_requests/insertNewPortcall.js');
var deletePortCall = require('../db_requests/deletePortcall.js');


router.get('/favicon.ico', function(req, res) {
    res.send(204);
});

router.get('/', function(req, res){
  
  getPortCalls.getAllOurPortcalls(function(body){
    res.render('index', { portCalls: body });
  })
  
});

router.post('/', function(req, res){
    createQueue.newQueue(req.body.pid, function(qid){
        insertPortCall.insertOneItem(req.body.pid, qid);
    })
    res.redirect('/');
});

router.get('/:id', function(req, res){
    
    portCallRequest.portCall(req.params.id, function(body) {
        res.render('portcall', { portCall: body });
    })
    
    /*getPortcalls.getAllOurPortcalls(function(qId){
        getQueueMessage.newQueueMessages(qId, function(messages){
            console.log(messages);
        })
    })*/
    
});

router.post('/:id', function(req, res){
    var datetime = new Date(req.body.datetime);
    var currentDate = new Date();
    /*if (datetime < currentDate) {
        res.render('error', { message: 'Invalid date' });
        return;
    }*/
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
