import Course from '../models/course.model.js';
import Year from '../models/year.model.js';
import Degree from '../models/degree.model.js';


// Create a new Course
export const addCourse = async (req, res) => {
    try {
        const { name, yearName, degreeName } = req.body;

        if (!name || !yearName || !degreeName) {
            return res.status(400).json({ message: 'Name, Year Name, and Degree Name are required' });
        }

        // Check if the degree exists
        const degree = await Degree.findOne({ name: degreeName });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        // Check if the year exists for the degree
        const year = await Year.findOne({ name: yearName, degree: degree._id });
        if (!year) {
            return res.status(404).json({ message: 'Year not found for the selected degree' });
        }

        // Check if the course already exists for the year
        const existingCourse = await Course.findOne({ name, year: year._id });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course name already exists for this year' });
        }

        // Create and save the new course
        const newCourse = new Course({ name, year: year._id });
        const savedCourse = await newCourse.save();

        res.status(201).json({ course: savedCourse });
    } catch (error) {
        res.status(500).json({ error: 'Error adding course: ' + error.message });
    }
};

// Read all Courses for a Year and Degree
export const getCoursesByYearAndDegree = async (req, res) => {
    try {
        const { yearName, degreeName } = req.params;

        // Check if the degree exists
        const degree = await Degree.findOne({ name: degreeName });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        // Check if the year exists for the degree
        const year = await Year.findOne({ name: yearName, degree: degree._id });
        if (!year) {
            return res.status(404).json({ message: 'Year not found for the selected degree' });
        }

        // Find and return courses for the year and degree
        const courses = await Course.find({ year: year._id });
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses: ' + error.message });
    }
};

// Update a Course by Name
export const updateCourseByName = async (req, res) => {
    try {
        const { name } = req.params;
        const { newName, yearName, degreeName } = req.body;

        if (!newName || !yearName || !degreeName) {
            return res.status(400).json({ message: 'New name, Year Name, and Degree Name are required' });
        }

        // Check if the degree exists
        const degree = await Degree.findOne({ name: degreeName });
        if (!degree) {
            return res.status(404).json({ message: 'Degree not found' });
        }

        // Check if the year exists for the degree
        const year = await Year.findOne({ name: yearName, degree: degree._id });
        if (!year) {
            return res.status(404).json({ message: 'Year not found for the selected degree' });
        }

        const course = await Course.findOneAndUpdate(
            { name, year: year._id },
            { name: newName },
            { new: true }
        );
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ error: 'Error updating course: ' + error.message });
    }
};

// Delete a Course by Name
export const deleteCourseByName = async (req, res) => {
    try {
        const { name } = req.params;

        const course = await Course.findOneAndDelete({ name });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting course: ' + error.message });
    }
};
