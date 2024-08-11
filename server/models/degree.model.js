import mongoose from 'mongoose';

const degreeSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Degree = mongoose.model('Degree', degreeSchema);
export default Degree;