var assert = require('assert');
var request = require('supertest');
var app = require('../fixtures/fixture-app.js');

exports.it_should_login = function(done){
  request(app)
  .post('/login')
  .send({username : 'foo', password : 'bar'})
  .expect(200)
  .end(function(err, res){
    assert.ok(!err);
    assert.ok(res.body.session);
    return done();
  });
};
