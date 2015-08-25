var assert = require('assert');
var request = require('supertest');
var app = require('../fixtures/fixture-app.js');

exports.it_should_list_list_items = function(done){
  request(app)
  .get('/lists/1a/items')
  .set('x-sp-session', '1a')
  .expect(200)
  .end(function(err, res){
    assert.ok(!err);
    assert.ok(res.body.length > 0);
    return done();
  });
};

exports.it_should_create_list_items = function(done){
  request(app)
  .post('/lists/1a/items')
  .send({title : 'foo', description : 'bar'})
  .set('x-sp-session', '1a')
  .expect(200)
  .end(function(err, res){
    assert.ok(!err);
    assert.ok(res.body);
    return done();
  });
};

exports.it_should_delete_lists = function(done){
  request(app)
  .del('/lists/1a/items/1b')
  .set('x-sp-session', '1a')
  .expect(200)
  .end(function(err, res){
    assert.ok(!err);
    assert.ok(res.body);
    return done();
  });
};
