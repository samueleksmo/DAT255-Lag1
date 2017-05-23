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
var insertPortCallMessage = require('../db_requests/insertPortCallMessage.js')
var getQueueId = require('../db_requests/getQueueId.js');
var getPortcallMessages = require('../db_requests/getPortcallMessages.js');
var portCall30Request = require('../portcdm_backend_requests/getPortCall30.js');
var insertNote = require('../db_requests/insertNote.js');
var getNote = require('../db_requests/getNote.js');
var deleteItem = require('../db_requests/deletePortcall.js');



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
                    queueMessagesToJs(xmlMessages, req.params.id, function(jsonMessages) {
                        getPortcallMessages.getPCM(req.params.id, function(oldMessages) {
                            getNote.getNote(req.params.id, function(note){
                                res.render('portcall', { portCall: portCallBody, messages: jsonMessages, oldMessages: oldMessages, note: note });
                            })
                        })
                    })
                })
            })
        })
});
    

router.post('/:id', function(req, res){
    var datetime = new Date(req.body.datetime);
    //Change timezone from CET to UTC
    datetime.setHours(datetime.getHours());
    
    if (req.body.state == 'note') {
        insertNote.insertOneItem(req.params.id, req.body.note);
    }

    if (req.body.serviceObject == 'SLOP_OPERATION') {
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, new Date(), req.body.serviceObject, 
            'REQUEST_RECEIVED', req.body.berth, req.body.comment);
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, new Date(), req.body.serviceObject, 
            req.body.timeSequence, req.body.berth, req.body.comment);
    } 

    else if (req.body.state == 'serviceState')
        postServiceState.postServiceState(req.params.id, req.body.vesselId, req.body.timeType, datetime, req.body.serviceObject, 
            req.body.timeSequence, req.body.berth, req.body.comment);

    else if (req.body.state == 'locationState')
        postLocationState.postLocationState(req.params.id, req.body.vesselId, req.body.timeType, datetime, 
                req.body.serviceObject, req.body.berth, req.body.comment);
    
    res.redirect('/' + req.params.id);
})

router.delete('/:id', function(req,res){
    deleteItem.deleteOneItem(req.params.id);
    res.redirect('/');
})

//Turn xml messages from the queue into js and puts them in the database
function queueMessagesToJs(xml, portcallid, callback) {
    
    var xmlSlice = xml.slice(120, -13);  
    var result = [];
    
    while (xmlSlice !== "") {
        parseString(xmlSlice, function (err, result1) {
            result.push(result1);
            insertPortCallMessage.insertOneItem(portcallid, result1);   
        });

        xmlSlice = xmlSlice.slice(xmlSlice.indexOf('</ns2:portCallMessage>') + '</ns2:portCallMessage>'.length);

    }
callback(result);
}

module.exports = router;
