import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const VideoComponent = () => {
  const { lessonName } = useParams();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log(`Fetching videos for lesson: ${lessonName}`);
        const response = await axios.get(`/api/videos/lesson/${lessonName}`);
        console.log('API Response:', response.data);
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to fetch videos. Please try again later.');
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchVideos();
  }, [lessonName]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 bg-gray-900 p-4">{error}</div>;
  }

  if (!videos.length) {
    return <div className="text-white bg-gray-900 p-4">No videos available for this lesson.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-white text-2xl mb-4">{lessonName} Videos</h1>
      {videos.map((video) => {
        const videoIdFromUrl = video.url.split('v=')[1]?.split('&')[0] || video.url.split('/').pop();
        return (
          <div key={video._id} className="mb-4 w-full max-w-2xl">
            <h3 className="text-white text-xl mb-2">{video.title}</h3>
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${videoIdFromUrl}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

export default VideoComponent;
