import User from "../models/user.js";
import jwt from 'jsonwebtoken';


// Get User Details
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

// Get User Friends
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(({ _id, fullname, username, picturePath, location, bio, occupation }) => {
            return ({ _id, fullname, username, picturePath, location, bio, occupation });
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

// Update User Friends
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({ _id, fullname, username, picturePath, location, bio, occupation }) => {
            return ({ _id, fullname, username, picturePath, location, bio, occupation });
        });
        res.status(200).json(formattedFriends);

    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

// Update User
export const updateUser = async (req, res) => {
    try {
        const { _id, fullname, username, location, bio, occupation } = req.body;
        const newUser = await User.findByIdAndUpdate(
            _id,
            {
                fullname: fullname,
                username: username,
                location: location,
                bio: bio,
                occupation: occupation,
            },
            { new: true },
        );
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
        res.status(201).json({ token, newUser });
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

// Update User Image
// export const updateUserImage = async (req, res) => {
//     try {
//         const { _id } = req.body;
//         let val = req.newFileName;
//         const newUser = await User.findByIdAndUpdate(
//             _id,
//             { picturePath: val },
//             { new: true },
//         );
//         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
//         res.status(201).json({ token, newUser });
//     } catch (error) {
//         return res.status(404).json({ message: error });
//     }
// }
