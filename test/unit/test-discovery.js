var assert = require('assert'),
fs = require('fs');

exports.it_should_render_api_blueprint = function(done){
  var md = fs.readFileSync('./README.md');
  assert.ok(md);
  return done();
};
