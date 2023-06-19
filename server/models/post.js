import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        picturePath: {
            type: String,
            required: true,
        },
        userPicturePath: {
            type: String,
            required: true,
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments : {
            type: Array,
            default : []
        }
    },
    {
        timestamps : true
    }
)
const Post = mongoose.model("Post", postSchema);
export default Post;