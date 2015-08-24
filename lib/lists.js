var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require('./auth');
var handleResponse = require('./handleResponse');

module.exports = function() {
  var lists = new express.Router();
  lists.use(cors());
  lists.use(bodyParser());
  
  lists.use(auth.middleware);
  
  // List all SharePoint List
  lists.get('/', function(req, res) {  
    return req.sharepoint.lists.list(handleResponse(res));
  });

  // Create a SharePoint List
  lists.post('/', function(req, res) {
    var listDefinition = req.body;
    return req.sharepoint.lists.create(listDefinition, handleResponse(res));
  });
  
  // Get a single instance of a sharepoint list by Id
  lists.get('/:guid', function(req, res) {  
    return req.sharepoint.lists.read(req.params.guid, handleResponse(res));
  });
  
  // Get a single instance of a sharepoint list by Id
  lists['delete']('/:guid', function(req, res) {  
    return req.sharepoint.lists.del(req.params.guid, handleResponse(res));
  });
  
  lists.put('/:guid', function(req, res){
    return req.sharepoint.lists.update(req.params.guid, req.body, handleResponse(res));
  });
  
  return lists;
};
