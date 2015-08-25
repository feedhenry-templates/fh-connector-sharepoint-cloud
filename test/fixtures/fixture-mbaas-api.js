module.exports = {
  session : {
    get : function(key, cb){
      if (key === '1a'){
        return cb(null, '{ "username" : "foo", "password" : "bar" }');
      }
      return cb(null, undefined);
    },
    set : function(key, val, timeout, cb){
      return cb(null, val);
    }
  }
};
