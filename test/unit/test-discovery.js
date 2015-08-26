var assert = require('assert'),
protagonist = require('protagonist'),
fs = require('fs');
  
exports.it_should_render_api_blueprint = function(done){
  var md = fs.readFileSync('./README.md');
  assert.ok(md);
  protagonist.parse(md.toString(), function(error, result) {
      assert.ok(!error);
      assert.ok(result);
      assert.ok(result.ast);
      return done();
  });
};
