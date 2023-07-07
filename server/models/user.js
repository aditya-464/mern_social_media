import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            min: 2
        },
        username: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        picturePath: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        bio: String,
        occupation: String,
        profileViews: Number,
        impressions: Number
    },
    {
        timestamps: true
    },
    {
        collection: 'users'
    }
);

const User = mongoose.model("User", UserSchema);
export default User;