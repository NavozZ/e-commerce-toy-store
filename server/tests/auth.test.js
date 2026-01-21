const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('🔐 Auth API Tests', function() {
  this.timeout(10000); 

  // Clean DB before starting
  before(async () => {
    await User.deleteMany({ email: 'test@example.com' });
  });

  // Clean DB after finishing
  after(async () => {
    await User.deleteMany({ email: 'test@example.com' });
    
  });

  let userToken;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
    userToken = res.body.token; 
  });

  it('should login the registered user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body.email).to.equal('test@example.com');
  });

  it('should reject wrong passwords', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    expect(res.status).to.equal(401);
  });
});