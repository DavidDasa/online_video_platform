import Year from '../models/year.model.js';
import Degree from '../models/degree.model.js';

// Create a new Year
export const addYear = async (req, res) => {
    try {
        const { name, degreeName } = req.body;

        if (!name || !degreeName) {
            return res.status(400).json({ message: 'Name and Degree Name are required' });
        }

        // Check if the degree exists
        const degree = await Degree.findOne({ name: degreeName });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        // Check if the year already exists for the degree
        const existingYear = await Year.findOne({ name, degree: degree._id });
        if (existingYear) {
            return res.status(400).json({ message: 'Year name already exists for this degree' });
        }

        // Create and save the new year
        const newYear = new Year({ name, degree: degree._id });
        const savedYear = await newYear.save();

        res.status(201).json({ year: savedYear });
    } catch (error) {
        res.status(500).json({ error: 'Error adding year: ' + error.message });
    }
};

// Read all Years for a Degree
export const getYearsByDegreeName = async (req, res) => {
    try {
        const { degreeName } = req.params;

        const degree = await Degree.findOne({ name: degreeName });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        const years = await Year.find({ degree: degree._id });
        res.status(200).json({ years });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching years: ' + error.message });
    }
};

// Update a Year by Name
export const updateYearByName = async (req, res) => {
    try {
        const { name } = req.params;
        const { newName, degreeName } = req.body;

        if (!newName || !degreeName) {
            return res.status(400).json({ message: 'New name and Degree Name are required' });
        }

        const degree = await Degree.findOne({ name: degreeName });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        const year = await Year.findOneAndUpdate(
            { name, degree: degree._id },
            { name: newName },
            { new: true }
        );
        if (!year) {
            return res.status(404).json({ message: 'Year not found' });
        }

        res.status(200).json({ year });
    } catch (error) {
        res.status(500).json({ error: 'Error updating year: ' + error.message });
    }
};

// Delete a Year by Name
export const deleteYearByName = async (req, res) => {
    try {
        const { name } = req.params;

        const year = await Year.findOneAndDelete({ name });
        if (!year) {
            return res.status(404).json({ message: 'Year not found' });
        }

        res.status(200).json({ message: 'Year deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting year: ' + error.message });
    }
};
