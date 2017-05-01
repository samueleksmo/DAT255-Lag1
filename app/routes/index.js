var express = require('express');
var router = express.Router();

var portCallsRequest = require('../portcdm_backend_requests/getPortCalls.js')

router.get('/', function(req, res){
  res.render('index', { portCalls: portCallsRequest.portCalls() });
});


module.exports = router;