module.exports = function(){
  return {
    login : function(cb){
        return cb(null, { session : '1a' });
    },
    lists : {
      list : function(cb){
        return cb(null, [{}]);
      },
      create : function(list, cb){
        return cb(null, list);
      },
      del : function(id, cb){
        return cb(null, {});
      }
    },
    listItems : {
      list : function(listId, cb){
        return cb(null, [{}]);
      },
      create : function(listId, listDef, cb){
        return cb(null, {});
      },
      del : function(listId, itemId, cb){
        return cb(null, {});
      }
    }
  };
};
