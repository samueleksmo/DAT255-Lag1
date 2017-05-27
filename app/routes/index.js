var express = require('express');
var router = express.Router();

var getPortCalls = require('../portcdm_backend_requests/getPortCalls.js');
var createQueue = require('../portcdm_backend_requests/createQueue.js');

var getAddedPortCalls = require('../db_requests/getAddedPortcalls.js');
var addPortCall = require('../db_requests/insertPortcall.js');
var deletePortCall = require('../db_requests/deletePortcall.js');

//Renders latest and added port calls to front end
router.get('/', function(req, res){
    getPortCalls.getPortCalls(function(latestPortCalls){
        getAddedPortCalls.getAddedPortcalls(function(addedPortCalls){
            res.render('index', { latestPortCalls: latestPortCalls, addedPortCalls: addedPortCalls });    
        });
    });
});

//Creates a new queue and adds a new port call to the data base
router.post('/', function(req, res){
    createQueue.newQueue(req.body.pid, function(qid){
        addPortCall.insertPortCall(req.body.pid, qid, req.body.vname);
    });
    res.redirect('/');
});

//Deletes a port call from the data base
router.delete('/:id', function(req,res){
    deletePortCall.deletePortCall(req.params.id);
    res.redirect('/');
});

module.exports = router;
