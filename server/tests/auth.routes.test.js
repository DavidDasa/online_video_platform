import request from 'supertest';
import express from 'express';
import authRouter from '../routes/auth.routes.js';

const app = express();
app.use(express.json());
app.use('/api', authRouter);

describe('Auth Routes', () => {
    it('should sign up a new user', async () => {
        const newUser = {
            username: 'testuser',
            password: 'testpassword'
        };

        const response = await request(app)
            .post('/api/signup')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', newUser.username);
    });

    it('should log in an existing user', async () => {
        const user = {
            username: 'testuser',
            password: 'testpassword'
        };

        const response = await request(app)
            .post('/api/login')
            .send(user);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});