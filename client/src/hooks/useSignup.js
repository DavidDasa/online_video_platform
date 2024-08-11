import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, email, password }) => {
    const success = handleInputErrors({ fullName, email, password });
    if (!success) return false;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, email, password }) {
  if (!fullName || !email || !password) {
    toast.error('Please fill in all fields');
    return false;
  }



  return true;
}
