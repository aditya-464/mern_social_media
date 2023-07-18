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
            type: String
        },
        description: {
            type: String
        },
        pictureId:{
            type : String
        },
        picturePath: {
            type: String
        },
        userPicturePath: {
            type: String
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
    },
    {
        collection: 'posts'
    }
)
const Post = mongoose.model("Post", postSchema);
export default Post;