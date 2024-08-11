import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const YearSelection = () => {
  const { degreeName } = useParams();
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYears = async () => {
      try {
        console.log(`Fetching years for degree: ${degreeName}`);
        const response = await axios.get(`/api/years/${degreeName}`);
        console.log('API Response:', response.data);
        setYears(response.data.years || []); // Set years from response, default to an empty array if undefined
      } catch (error) {
        console.error('Error fetching years:', error);
        setError('Failed to fetch years. Please try again later.');
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchYears();
  }, [degreeName]);

  const handleYearSelect = (yearName) => {
    navigate(`/courses/${yearName}/${degreeName}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-white text-2xl mb-4">Select a Year</h1>
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
          {years.length > 0 ? (
            years.map((year) => (
              <li key={year._id} className="mb-2">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => handleYearSelect(year.name)}
                >
                  {year.name}
                </button>
              </li>
            ))
          ) : (
            <p className="text-white">No years available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default YearSelection;
