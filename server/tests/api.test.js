const request = require('supertest');
const expect = require('chai').expect;
const app = 'http://localhost:5000'; // Target the running server

describe('Toy Store API Integration Tests', () => {
  it('should return all products as JSON', (done) => {
    request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});