const router = require('express').Router();
const userModel = require('../modals/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
// Sign Up Route
const signUp =  async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {
        const userExists = await userModel.findOne({ userEmail });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        const newUser = new userModel({
            userName,
            userEmail,
            userPassword: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during sign up:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};

// Sign In Route
const signIn = async (req, res) => {
    const { userEmail, userPassword } = req.body;
    try {
        const user = await userModel.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

    const token = jwt.sign({ _id:user._id,role:user.userRole }, JWT_SECRET ,{
            expiresIn: '5h',
          });

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error during sign in:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports =  {
    signUp,
    signIn
}
