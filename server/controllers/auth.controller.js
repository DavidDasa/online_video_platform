import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // ייבוא של מודול jsonwebtoken
import generateTokenAndSetCookie from "../utils/generateToken.js";
import User from '../models/user.model.js'; // Ensure the correct path to your user model

const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Ensure the email has the suffix @hit.ac.il
        const emailSuffix = '@hit.ac.il';
        if (!email.endsWith(emailSuffix)) {
            return res.status(400).json({ message: 'Email must be with the suffix @hit.ac.il' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT token and set cookie
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure the email has the suffix @hit.ac.il
        const emailSuffix = '@hit.ac.il';
        if (!email.endsWith(emailSuffix)) {
            return res.status(400).json({ message: 'Email must be with the suffix @hit.ac.il' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { signup, login, logout };
