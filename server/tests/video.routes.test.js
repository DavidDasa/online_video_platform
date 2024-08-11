import request from 'supertest';
import express from 'express';
import router from '../routes/video.routes.js';

const app = express();
app.use(express.json());
app.use('/api', router);

describe('Video Routes', () => {
    it('should fetch videos by degree, year, course, and lesson', async () => {
        const response = await request(app)
            .get('/api/videos')
            .query({ degreeId: 'degree1', yearId: 'year1', courseId: 'course1', lessonId: 'lesson1' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('videos');
    });

    it('should add a new video', async () => {
        const newVideo = {
            title: 'New Video',
            url: 'http://example.com/video',
            lessonId: 'lesson1'
        };

        const response = await request(app)
            .post('/api/videos')
            .send(newVideo);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('video');
        expect(response.body.video).toMatchObject(newVideo);
    });
});