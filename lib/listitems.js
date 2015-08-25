var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require('./auth');
var handleResponse = require('./handleResponse');

module.exports = function() {
  var listItems = new express.Router();
  listItems.use(cors());
  listItems.use(bodyParser());
  
  listItems.use(auth.middleware);

  
  listItems.get('/:guid/items', function(req, res){
    return req.sharepoint.listItems.list(req.params.guid, handleResponse(res));
  });
  
  listItems.post('/:guid/items', function(req, res){
    return req.sharepoint.listItems.create(req.params.guid, req.body, handleResponse(res));
  });
  
  listItems.get('/:guid/items/:itemId', function(req, res){
    return req.sharepoint.listItems.read(req.params.guid, req.params.itemId, handleResponse(res));
  });
  
  listItems['delete']('/:guid/items/:itemId', function(req, res){
    return req.sharepoint.listItems.del(req.params.guid, req.params.itemId, handleResponse(res));
  });
  
  return listItems;
};
