const chai = require('chai');
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:3000');

describe ('User', function() {
  it('Should return a 200 response', function(done) {
    api.get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
