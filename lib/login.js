var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require('./auth');
var _ = require('underscore');

module.exports = function() {
  var login = new express.Router();
  login.use(cors());
  login.use(bodyParser());
  
  login.post('/', function(req, res) {
    return auth.set(req, function(err, loginResult){
      if (err){
        if (_.isError(err)){
          err = err.toString();
        }
        err = {
          err : err,
          code : 500
        };
        return res.status(err.code).json(err);
      }
      return res.json(loginResult);
    });
  });
  
  return login;
};
