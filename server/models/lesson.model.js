import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;