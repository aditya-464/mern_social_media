import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Register User
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Hashing password
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating and saving user
        const newUser = new User({
            fullname, username : "username", email, password: hashedPassword, picturePath: "picturePath", friends: [], location: "location", bio: "bio", occupation: "occupation", profileViews: 10, impressions: 10
        });
        const savedNewUser = await newUser.save();
        res.status(201).json(savedNewUser);

    } catch (err) {
        res.status(500).json({ errror: err });
    }
}


// Login User
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Enter all fields!" });
        }
        const user = User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY);
        delete user.password;
        res.status(200).json(token, user);
    } catch (error) {
        res.status(500).json({ errror: err });
    }
}



// Setup account deatails
// export const setupAccount = async(req, res)=>{
    
// }