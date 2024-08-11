import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx'; // Ensure correct path
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the request
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Logout failed');
      }

      const data = await response.json();
      console.log('Logout successful:', data.message);

      // Clear token from localStorage
      localStorage.removeItem('token');

      // Clear authUser from context
      setAuthUser(null);

      // Show success toast
      toast.success('Logout successful!');

      // Navigate to login page after logout
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Online Video Platform</h1>
        <nav className="flex items-center space-x-4">
          {authUser ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
