import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import multer from "multer";
import helmet from "helmet";
import morgan from 'morgan'
import path from "path";
import jwt from 'jsonwebtoken';
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import { verifyToken } from "./middlewares/auth.js";
// import { createPost } from "./controllers/post.js";
// import { updateUserImage } from "./controllers/users.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary"
import User from "./models/user.js";
import Post from "./models/post.js";
import * as fs from "fs";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cloudinaryV2 = cloudinary.v2;
dotenv.config({ path: "./config.env" });
cloudinaryV2.config({
    // cloud_name: process.env.CLOUD_NAME,
    // api_secret: process.env.API_SECRET,
    
    cloud_name: "dlwuelfjo",
    api_key: "643885532827244",
    api_secret: "_jfHIymWl3S_hDfygoW4V6SIlp0"
});

console.log(cloudinaryV2.config().api_key);

const app = express();
app.use(express.json({
    limit: "30mb",
    extended: "true"
}));
app.use(express.urlencoded({
    limit: "30mb",
    extended: "true"
}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage locally in pc
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         let fn = file.originalname;
//         let len = 0;
//         for (let i = fn.length - 1; i >= 0; i--) {
//             if (fn[i] === '.') {
//                 len = i;
//                 break;
//             }
//         }
//         let ft = fn.substring(len + 1);
//         let newName = file.originalname + "-" + Date.now() + "." + ft;
//         req.newFileName = newName;
//         cb(null, newName);
//     }
// });
// const upload = multer({ storage });

// Routes with files for local storage
// app.post("/posts", verifyToken, upload.single("picture"), createPost);
// app.patch("/users/updateUserImage", verifyToken, upload.single("picture"), updateUserImage);


// fileUpload for cloudinary
app.use(fileUpload({
    useTempFiles: true
}))

// Routes with files for Cloudinary
const createNewPost = async (req, res) => {
    try {
        const file = req.files.picture;
        const uploadImage = await cloudinaryV2.uploader.upload(file.tempFilePath);
        if (uploadImage.url) {
            const { userId, description } = req.body;
            const user = await User.findById(userId);
            const newPost = new Post({
                userId,
                fullname: user.fullname,
                location: user.location,
                description,
                pictureId: uploadImage.public_id,
                picturePath: uploadImage.url,
                userPicturePath: user.picturePath,
                likes: {},
                comments: []
            })
            await newPost.save();
            const post = await Post.find();
            fs.unlink(file.tempFilePath, (err) => {
                if (err) throw err;
            })
            res.status(201).json(post);
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }

    // try {
    //     const { userId, description, picturePath } = req.body;
    //     let val = req.newFileName;
    //     const user = await User.findById(userId);
    //     const newPost = new Post({
    //         userId,
    //         fullname: user.fullname,
    //         location: user.location,
    //         description,
    //         picturePath: val,
    //         userPicturePath: user.picturePath,
    //         likes: {},
    //         comments: []
    //     })
    //     await newPost.save();
    //     const post = await Post.find();
    //     res.status(201).json(post);
    // } catch (error) {
    //     res.status(409).json({ message: error });
    // }
}
app.post("/posts", verifyToken, createNewPost);

const updateNewUserImage = async (req, res) => {
    try {
        const { _id } = req.body;
        console.log(cloudinaryV2.config().api_key);
        const prevUser = await User.findById(_id);
        const pictureId = prevUser.pictureId;
        if (pictureId !== "") {
            const deleteImageCloudinary = await cloudinaryV2.uploader.destroy(pictureId);
        }
        const file = req.files.picture;
        const uploadImage = await cloudinaryV2.uploader.upload(file.tempFilePath);
        if (uploadImage.url !== "" && uploadImage.public_id !== "") {
            const newUser = await User.findByIdAndUpdate(
                _id,
                {
                    pictureId: uploadImage.public_id,
                    picturePath: uploadImage.url
                },

                { new: true },
            );
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
            fs.unlink(file.tempFilePath, (err) => {
                if (err) throw err;
            })
            res.status(201).json({ token, newUser });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error });
    }
}
app.patch("/users/updateUserImage", verifyToken, updateNewUserImage);


// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Routes with files
// app.use("/posts", verifyToken, upload.single("picture"), createPost);

// Connection with Database
const DB = process.env.MONGO_URL;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection with database is Successful!");
}).catch((err) => {
    console.log("Connection with database Failed!", err);
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
    console.log(`Server is running on PORT :  ${PORT}`);
})