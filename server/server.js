import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './config/connectMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import videoRoutes from './routes/video.routes.js';
import degreeRoutes from './routes/degree.routes.js';
import yearRoutes from './routes/year.routes.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:3000', // כתובת ה-URL של הלקוח שלך
}));
connectMongoDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/degrees', degreeRoutes);
app.use('/api/years', yearRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
