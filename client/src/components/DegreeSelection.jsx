import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DegreeSelection = () => {
  const [degrees, setDegrees] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await axios.get('/api/degrees');
        setDegrees(response.data.degrees); // Assuming the response has a `degrees` field
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching degrees:', error);
        setError('Failed to fetch degrees. Please try again later.');
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDegrees();
  }, []);

  const handleDegreeSelect = (degreeName) => {
    navigate(`/degrees/${degreeName}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-white text-2xl mb-4">Select a Degree</h1>
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
        <ul className="space-y-4">
          {degrees.map((degree) => (
            <li key={degree._id} className="w-full max-w-md">
              <button
                className="w-full py-3 px-5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => handleDegreeSelect(degree.name)}
              >
                {degree.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DegreeSelection;
