import Lesson from '../models/lesson.model.js';
import Course from '../models/course.model.js';

// Create a new Lesson
export const addLesson = async (req, res) => {
    try {
        const { name, courseName } = req.body;

        if (!name || !courseName) {
            return res.status(400).json({ message: 'Name and Course Name are required' });
        }

        // Check if the course exists
        const course = await Course.findOne({ name: courseName });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the lesson already exists for the course
        const existingLesson = await Lesson.findOne({ name, course: course._id });
        if (existingLesson) {
            return res.status(400).json({ message: 'Lesson name already exists for this course' });
        }

        // Create and save the new lesson
        const newLesson = new Lesson({ name, course: course._id });
        const savedLesson = await newLesson.save();

        res.status(201).json({ lesson: savedLesson });
    } catch (error) {
        res.status(500).json({ error: 'Error adding lesson: ' + error.message });
    }
};

// Read all Lessons for a Course
export const getLessonsByCourseName = async (req, res) => {
    try {
        const { courseName } = req.params;

        // Check if the course exists
        const course = await Course.findOne({ name: courseName });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find and return lessons for the course
        const lessons = await Lesson.find({ course: course._id });
        res.status(200).json({ lessons });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching lessons: ' + error.message });
    }
};

// Update a Lesson by Name
export const updateLessonByName = async (req, res) => {
    try {
        const { name } = req.params;
        const { newName, courseName } = req.body;

        if (!newName || !courseName) {
            return res.status(400).json({ message: 'New name and Course Name are required' });
        }

        // Check if the course exists
        const course = await Course.findOne({ name: courseName });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const lesson = await Lesson.findOneAndUpdate(
            { name, course: course._id },
            { name: newName },
            { new: true }
        );
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.status(200).json({ lesson });
    } catch (error) {
        res.status(500).json({ error: 'Error updating lesson: ' + error.message });
    }
};

// Delete a Lesson by Name
export const deleteLessonByName = async (req, res) => {
    try {
        const { name } = req.params;

        const lesson = await Lesson.findOneAndDelete({ name });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting lesson: ' + error.message });
    }
};
