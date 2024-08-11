import Degree from '../models/degree.model.js';

// Create a new Degree
export const addDegree = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Check if the degree already exists
        const existingDegree = await Degree.findOne({ name });
        if (existingDegree) {
            return res.status(400).json({ message: 'Degree name already exists' });
        }

        // Create and save the new degree
        const newDegree = new Degree({ name });
        const savedDegree = await newDegree.save();

        res.status(201).json({ degree: savedDegree });
    } catch (error) {
        res.status(500).json({ error: 'Error adding degree: ' + error.message });
    }
};

// Read all Degrees
export const getAllDegrees = async (req, res) => {
    try {
        const degrees = await Degree.find();
        res.status(200).json({ degrees });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching degrees: ' + error.message });
    }
};

// Read a Degree by Name
export const getDegreeByName = async (req, res) => {
    try {
        const { name } = req.params;

        const degree = await Degree.findOne({ name });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        res.status(200).json({ degree });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching degree: ' + error.message });
    }
};

// Update a Degree by Name
export const updateDegreeByName = async (req, res) => {
    try {
        const { name } = req.params;
        const { newName } = req.body;

        if (!newName) {
            return res.status(400).json({ message: 'New name is required' });
        }

        const degree = await Degree.findOneAndUpdate({ name }, { name: newName }, { new: true });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        res.status(200).json({ degree });
    } catch (error) {
        res.status(500).json({ error: 'Error updating degree: ' + error.message });
    }
};

// Delete a Degree by Name
export const deleteDegreeByName = async (req, res) => {
    try {
        const { name } = req.params;

        const degree = await Degree.findOneAndDelete({ name });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        res.status(200).json({ message: 'Degree deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting degree: ' + error.message });
    }
};
