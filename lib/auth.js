var fh = require('fh-mbaas-api'),
_ = require('underscore'),
uuid = require('node-uuid'),
sp = require('sharepointer');

function getParamsFromEnvVariables(){
  return {
    username : process.env.SHAREPOINT_USERNAME,
    password : process.env.SHAREPOINT_PASSWORD,
    type : process.env.SHAREPOINT_AUTH_TYPE || 'basic',
    url : process.env.SHAREPOINT_HOSTNAME,
    strictSSL : (process.env.SHAREPOINT_STRICT_SSL === 'true')
  };
}

function getAuthDetails(req, cb){
  var sessionToken = req.query.session || req.body.session || req.headers['x-sp-session'] || false;
  if (sessionToken){
    return fh.session.get(sessionToken, function(err, data){
      if (err || !data){
        err = err || { message : 'No session found in session store for this value' };
        err.code = 401;
        return cb(err || 'No session for that value found');  
      }
      try{
        data = JSON.parse(data);
      }catch(err){
        err.code = 401;
        err.message = 'Error parsing data from session store';
        console.error("Error parsing data from session store");
        return cb(err);
      }
      data.type = data.type || process.env.SHAREPOINT_AUTH_TYPE || 'basic';
      data.type = data.type || process.env.SHAREPOINT_AUTH_TYPE || 'basic';
      data.url = data.url || process.env.SHAREPOINT_HOSTNAME;
      data.strictSSL = data.strictSSL || process.env.SHAREPOINT_STRICT_SSL;
      return cb(null, data);
    });
  }
  // No session set - revert to env variables
  var params = getParamsFromEnvVariables();
  params.username = process.env.SHAREPOINT_USERNAME;
  params.password = process.env.SHAREPOINT_PASSWORD;
    
  
  if (!params.username || !params.password || !params.url || !params.type){
    return cb({ message : 'Missing username, password, url or auth type', code : 401 });
  }
  return cb(null, params);
}

// Retrieve login details either from a session token or environment variables
exports.get = function(req, cb){
  getAuthDetails(req, function(err, authData){
    if (err){
      return cb(err);
    }
    var verboseMode = req.query.verbose || req.body.verbose || false,
    sharepointer;
    try{
      sharepointer = require('sharepointer')(_.extend({
        verbose : verboseMode
      }, authData));
    }catch(err){
      return cb(err);
    }
    return cb(null, sharepointer);
  });
};

// Perform a login to generate a session token
exports.set = function(req, cb){
  var params = req.body,
  sessionId = uuid.v1(),
  sessionExpire = process.env.SHAREPOINT_SP_SESSION_TIMEOUT || 60 * 60, // 60 minutes,
  sharepointer;
  
  if (_.isString(sessionExpire)){
    sessionExpire = parseInt(sessionExpire, 10);
  }
  if (isNaN(sessionExpire)){
    sessionExpire = 60;
  }
  
  if (!params || !params.username || !params.password){
    var err = { code : 401, message : 'No username or password provided' };
    return cb(err);
  }
  
  params = _.extend(getParamsFromEnvVariables(), params);
  
  try{
    sharepointer = sp(params);
  }catch(err){
    return cb(err);
  }
  sharepointer.login(function(err){
    if (err){
      return cb(err);
    }
    fh.session.set(sessionId, JSON.stringify(req.body), sessionExpire, function(err){
      if (err){
        if (_.isError(err)){
          err = err.toString();
        }
        err = {
          err : err,
          code : 500
        };
        return cb(err);
      }
      return cb(null, { session : sessionId });
    });
  });
};

exports.middleware = function(req, res, next){
  exports.get(req, function(err, sharepoint){
    if (err){
      var code = err.code || 401;
      return res.status(code).json(err);
    }
    req.sharepoint = sharepoint;
    return next();
  });
};
