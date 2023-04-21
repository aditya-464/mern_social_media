import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Register User
export const register = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        // Hashing password
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating and saving user
        const newUser = new User({
            fullname, username, email, password: hashedPassword, location: "location", bio: "bio", occupation: "occupation", profileViews: 10, impressions: 10
        });
        const savedNewUser = await newUser.save();
        res.status(201).json(savedNewUser);

    } catch (err) {
        res.status(500).json({ errror: err });
    }
}