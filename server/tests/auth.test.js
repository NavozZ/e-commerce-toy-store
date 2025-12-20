// server/tests/auth.test.js
const request = require('supertest');
const { expect } = require('chai'); // Chai for assertions
const app = require('../src/index'); // Make sure your index.js exports 'app'
const mongoose = require('mongoose');

// Run this before all tests start
before(async () => {
    // If you haven't connected in index.js, do it here. 
    // Ideally, index.js should export the app and NOT listen if NODE_ENV is 'test'
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test_db');
    }
});

// Clean up after tests
after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Authentication API (Mocha/Chai)', () => {
    
    // Test 1: Registration
    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'mochatest',
                email: 'mocha@test.com',
                password: 'password123'
            });

        // Chai Syntax (Expect)
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
        expect(res.body.user).to.have.property('email', 'mocha@test.com');
    });

    // Test 2: Login
    it('should login the registered user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'mocha@test.com',
                password: 'password123'
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
    });

    // Test 3: Failure Case
    it('should reject login with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'mocha@test.com',
                password: 'wrongpassword'
            });

        expect(res.status).to.equal(401); // Or 400, depending on your controller
    });
});