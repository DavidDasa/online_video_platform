import mongoose from 'mongoose';

const yearSchema = new mongoose.Schema({
    name: { type: String, required: true },
    degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree', required: true }
});

const Year = mongoose.model('Year', yearSchema);
export default Year;