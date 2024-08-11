import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful', data);

      // Save JWT token to localStorage if required
      localStorage.setItem('token', data.token);

      // Navigate to /degrees and reload the page
      toast.success('Signup successful!');
      navigate('/degrees');
      window.location.reload(); // This will reload the page

    } catch (error) {
      setError(error.message);
      toast.error(`Signup failed: ${error.message}`);
      console.error('Signup error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full border border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </motion.div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white font-bold rounded-lg shadow-md ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </motion.button>
      </form>
    </div>
  );
};

export default SignupForm;
