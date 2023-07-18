import Post from "../models/post.js"
import User from "../models/user.js";


// Create Post 
// export const createPost = async (req, res) => {
//     try {
//         const file = req.files.picture;
//         const uploadImage = await cloudinaryV2.uploader.upload(file.tempFilePath);
//         console.log(uploadImage.url);
//     } catch (error) {
//         console.log(error);
//         res.status(409).json({ message: error });
//     }

//     // try {
//     //     const { userId, description, picturePath } = req.body;
//     //     let val = req.newFileName;
//     //     const user = await User.findById(userId);
//     //     const newPost = new Post({
//     //         userId,
//     //         fullname: user.fullname,
//     //         location: user.location,
//     //         description,
//     //         picturePath: val,
//     //         userPicturePath: user.picturePath,
//     //         likes: {},
//     //         comments: []
//     //     })
//     //     await newPost.save();
//     //     const post = await Post.find();
//     //     res.status(201).json(post);
//     // } catch (error) {
//     //     res.status(409).json({ message: error });
//     // }
// }

// Read Posts
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

// Update Post
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}
export const postComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body;
        const user = await User.findById(userId);
        const newComment = {
            userId: user._id,
            name: user.fullname,
            comment
        };
        const post = await Post.findById(id);
        const commentsArray = post.comments;
        commentsArray.push(newComment);
        const updatePostComments = await Post.findByIdAndUpdate(
            id,
            { comments: commentsArray },
            { new: true }
        );

        res.status(200).json(updatePostComments);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}