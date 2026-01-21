const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');

describe('🧸 Product API Tests', function() {
  this.timeout(10000);

  it('should GET all products', async () => {
    const res = await request(app).get('/api/products');
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    // Ensure we have products (assuming you ran seed.js)
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('price');
    }
  });

  it('should filter products by category', async () => {
    const res = await request(app).get('/api/products?category=Lego');
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    
    // Check that every returned item is actually Lego
    res.body.forEach(product => {
      expect(product.category).to.equal('Lego');
    });
  });
});