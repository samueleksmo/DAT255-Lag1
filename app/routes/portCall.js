var express = require('express');
var router = express.Router();

var parseString = require('xml2js').parseString;

var getPortCall = require('../portcdm_backend_requests/getPortCall.js');
var postServiceState = require('../portcdm_backend_requests/postServiceState.js');
var postLocationState = require('../portcdm_backend_requests/postLocationState.js');
var getQueueMessages = require('../portcdm_backend_requests/getQueueMessages.js');

var insertPortCallMessage = require('../db_requests/insertPortCallMessage.js')
var getQueueId = require('../db_requests/getQueueId.js');
var getPortCallMessages = require('../db_requests/getPortcallMessages.js');
var insertNote = require('../db_requests/insertNote.js');
var getNotes = require('../db_requests/getNotes.js');

//Renders all data from the port call, the latest messages, all messages from the data base and notes to the front end
router.get('/:id', function(req, res){
    
    getPortCall.getPortCall(req.params.id, function(portCall) {
            getQueueId.getQueueId(req.params.id, function(qid){
                getQueueMessages.getQueueMessages(qid, function(xmlMessages){
                    xmlMessagesToJs(xmlMessages, req.params.id, function(jsonMessages) {
                        getPortCallMessages.getPortCallMessages(req.params.id, function(allMessages) {
                            getNotes.getNotes(req.params.id, function(notes){
                                res.render('portcall', { portCall: portCall, latestMessages: jsonMessages, allMessages: allMessages, notes: notes });
                            });
                        });
                    });
                });
            });
        });
});
    

//Either adds a note the database or posts a message to the backend by fetching information from a form in the front end
router.post('/:id', function(req, res){

    var datetime = new Date(req.body.datetime);
    
    if (req.body.state == 'note') {
        insertNote.insertNote(req.params.id, req.body.note);
    }

    if (req.body.serviceObject == 'SLOP_OPERATION') {
        postServiceState.newServiceState(req.params.id, req.body.vesselId, req.body.timeType, new Date(), req.body.serviceObject, 
            'REQUEST_RECEIVED', req.body.berth, req.body.comment);
        postServiceState.newServiceState(req.params.id, req.body.vesselId, req.body.timeType, new Date(), req.body.serviceObject, 
            req.body.timeSequence, req.body.berth, req.body.comment);
    } 

    else if (req.body.state == 'serviceState')
        postServiceState.newServiceState(req.params.id, req.body.vesselId, req.body.timeType, datetime, req.body.serviceObject, 
            req.body.timeSequence, req.body.berth, req.body.comment);

    else if (req.body.state == 'locationState')
        postLocationState.newLocationState(req.params.id, req.body.vesselId, req.body.timeType, datetime, 
                req.body.serviceObject, req.body.berth, req.body.comment);
    
    res.redirect('/portcall/' + req.params.id);

})

//Turn xml messages from the queue into js and puts them in the database
function xmlMessagesToJs(xml, portcallid, callback) {
    
    var xmlSlice = xml.slice(120, -13);  
    var result = [];
    
    while (xmlSlice !== "") {
        parseString(xmlSlice, function (err, message) {
            result.unshift(message);
            insertPortCallMessage.insertPortCallMessage(portcallid, message);   
        });

        xmlSlice = xmlSlice.slice(xmlSlice.indexOf('</ns2:portCallMessage>') + '</ns2:portCallMessage>'.length);

    }
callback(result);
}

module.exports = router;