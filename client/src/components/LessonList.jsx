import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LessonList = () => {
  const { courseName } = useParams();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log(`Fetching lessons for course: ${courseName}`);
        const response = await axios.get(`/api/lessons/${courseName}`);
        console.log('API Response:', response.data);
        setLessons(response.data.lessons || []); // Set lessons from response, default to an empty array if undefined
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setError('Failed to fetch lessons. Please try again later.');
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchLessons();
  }, [courseName]);

  const handleLessonSelect = (lessonName) => {
    navigate(`/lesson/${lessonName}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-white text-2xl mb-4">Lessons</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <motion.div
            className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <ul className="w-full max-w-md">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <li key={lesson.name} className="mb-2">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => handleLessonSelect(lesson.name)}
                >
                  {lesson.name}
                </button>
              </li>
            ))
          ) : (
            <p className="text-white">No lessons available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default LessonList;
