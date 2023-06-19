import User from "../models/user.js";

// Get User Details
export const getUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

// Get User Friends
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => {
                User.findById(id);
            })
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
        const { id, friendId } = req.body;
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
            user.friends.map((id) => {
                User.findById(id);
            })
        );
        const formattedFriends = friends.map(({ _id, fullname, username, picturePath, location, bio, occupation }) => {
            return ({ _id, fullname, username, picturePath, location, bio, occupation });
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}
