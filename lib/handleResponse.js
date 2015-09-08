var _ = require('underscore');

module.exports = function handleResponse(res){
  return function(err, result){
    if (err){
      res.status(err.code || 500);
      if (_.isObject(err)){
        return res.json(err);
      }else{
        return res.end(err);
      }
    }
    return res.json(result);  
  };
};
