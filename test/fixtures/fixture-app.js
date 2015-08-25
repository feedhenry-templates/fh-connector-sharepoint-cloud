var proxyquire = require('proxyquire');
var mocks = {
  'sharepointer' : require('./fixture-sharepointer'),
  'fh-mbaas-api' : require('./fixture-mbaas-api')
};
mocks.sharepointer['@global'] = true;
mocks['fh-mbaas-api']['@global'] = true;
module.exports = proxyquire('../../application.js', mocks);
