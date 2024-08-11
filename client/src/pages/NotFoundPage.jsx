import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
      <p className="text-red-500">You need to be logged in to access this page.</p>
    </div>
  );
};

export default NotFoundPage;
