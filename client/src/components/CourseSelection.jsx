import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseSelection = () => {
  const { degreeName, yearName } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Validate parameters before making API call
    const fetchCourses = async () => {
      try {
        console.log(`Fetching courses for year: ${yearName}, degree: ${degreeName}`);
        const response = await axios.get(`/api/courses/${yearName}/${degreeName}`);
        console.log('API Response:', response.data);
        setCourses(response.data.courses); // Set courses from response
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses. Please try again later.');
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCourses();
  }, [degreeName, yearName]);

  const handleCourseSelect = (courseName) => {
    navigate(`/lessons/${courseName}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-white text-2xl mb-4">Select a Course</h1>
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
          {courses.length > 0 ? (
            courses.map((course) => (
              <li key={course.name} className="mb-2">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => handleCourseSelect(course.name)}
                >
                  {course.name}
                </button>
              </li>
            ))
          ) : (
            <p className="text-white">No courses available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CourseSelection;
