import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;