import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (email, password) => {
        const success = handleInputErrors(email, password);
        if (!success) return false;
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/login', { email, password });

            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data));
            setAuthUser(data);
            return true;
        } catch (error) {
            toast.error(error.message || 'Login failed');
            console.error('Login error:', error.response || error.message); // Log the error for debugging
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
