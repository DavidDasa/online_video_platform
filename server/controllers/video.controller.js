import Video from '../models/video.model.js';
import Lesson from '../models/lesson.model.js';

// Get videos by lesson name
export const getVideosByLessonName = async (req, res) => {
    try {
        const { lessonName } = req.params;

        if (!lessonName) {
            return res.status(400).json({ message: 'Lesson name is required' });
        }

        // Check if the lesson exists
        const lesson = await Lesson.findOne({ name: lessonName });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Fetch videos associated with the lesson
        const videos = await Video.find({ lesson: lesson._id });

        if (!videos.length) {
            return res.status(404).json({ message: 'No videos found for the selected lesson' });
        }

        res.status(200).json({ videos });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching videos: ' + error.message });
    }
};

// Add a new video
export const addVideo = async (req, res) => {
    try {
        const { title, url, lessonName } = req.body;

        if (!title || !url || !lessonName) {
            return res.status(400).json({ message: 'Title, URL, and Lesson name are required' });
        }

        // Check if the lesson exists
        const lesson = await Lesson.findOne({ name: lessonName });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Create a new video
        const newVideo = new Video({
            title,
            url,
            lesson: lesson._id
        });

        // Save the new video to the database
        const savedVideo = await newVideo.save();

        res.status(201).json({ video: savedVideo });
    } catch (error) {
        res.status(500).json({ error: 'Error adding video: ' + error.message });
    }
};

// Get a video by ID
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('lesson');
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ video });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching video: ' + error.message });
    }
};

// Update a video by ID
export const updateVideo = async (req, res) => {
    try {
        const { title, url, lessonName } = req.body;

        // Check if the lesson exists
        const lesson = await Lesson.findOne({ name: lessonName });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Update the video
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { title, url, lesson: lesson._id }, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ video: updatedVideo });
    } catch (error) {
        res.status(500).json({ error: 'Error updating video: ' + error.message });
    }
};

// Delete a video by ID
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting video: ' + error.message });
    }
};
