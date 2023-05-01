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
            unique: true,
            min: 5,
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
            min: 8,
            max: 15
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
    }
);

const User = mongoose.model("User", UserSchema);
export default User;