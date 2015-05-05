'use strict';

// Modules & Module Setup
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Start Server
require('./server.js');

describe('server.js', function() {
  describe('routing to', function() {
    describe('GET /time', function() {
      it('responds with the current time', function(done) {
        chai.request('http://localhost:3000')
          .get('/time')
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.eql('');
            done();
          });
      });
    });

    describe('GET /greet/name', function() {
      it('greets the name passed in the query', function(done){
        chai.request('http://localhost:3000')
          .get('/greet/name')
          .query( {name: 'test'} )
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.eq('hello, test.');
            done();
          });
      });
    });

    describe('POST /greet', function() {
      it('greets the name passed in the POST data', function(done) {
        chai.request('http://localhost:3000')
          .post('/greet')
          .send( {name: 'test'} )
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.eql('hello, test.');
            done();
          });
      });
    });

    describe('An unknown URI /someUnknownURI', function() {
      it('responds with a 404 and error message', function(done) {
        chai.request('http://localhost:3000')
          .get('/thisdoesnotexist')
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res).to.have.status(404);
            expect(res.body).to.eql('could not be found');
            done();
          });
      });
    });
  });
});








