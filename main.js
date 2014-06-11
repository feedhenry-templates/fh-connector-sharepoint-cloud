var SP = require('sharepoint');

/*
  Logs in with Sharepoint, and retrieves the contents of a list view
  @param params.list : The SharePoint custom list name
*/
exports.showSharepointList = function(params, callback) {
  var listName = params.list;
  var spo = new SP.RestService(process.env.SHAREPOINT_HOSTNAME);
  spo.signin(process.env.SHAREPOINT_USERNAME, process.env.SHAREPOINT_PASSWORD, function(err, data) {
    // check for errors during login, e.g. invalid credentials and handle accordingly.
    if (err) {
      return callback(err);
    }
    var oList = spo.list(listName);
    return oList.get(callback);
  });
};