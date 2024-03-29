import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
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
import User from "./models/user.js";
import Post from "./models/post.js";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";


// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: "./config.env" });


// Firebase config
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

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

const createNewPost = async (req, res) => {
    try {
        const imageName = req.file.originalname + "       " + Date.now();
        const storageRef = ref(storage, `files/${imageName}`);
        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };
        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        if (downloadURL !== "") {
            const { userId, description } = req.body;
            const user = await User.findById(userId);
            const newPost = new Post({
                userId,
                fullname: user.fullname,
                location: user.location,
                description,
                pictureId: imageName,
                picturePath: downloadURL,
                userPicturePath: user.picturePath,
                likes: {},
                comments: []
            })
            await newPost.save();
            const post = await Post.find();
            res.status(201).json(post);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error });
    }
}
app.post("/posts", verifyToken, upload.single("picture"), createNewPost);
const updateNewUserImage = async (req, res) => {
    try {
        const { _id } = req.body;
        const prevUser = await User.findById(_id);
        const imageName = prevUser.pictureId;
        const storage = getStorage();
        // Create a reference to the file to delete
        if (imageName !== "") {
            const delImgRef = ref(storage, `files/${imageName}`);
            const delImg = await deleteObject(delImgRef);
        }

        const newImageName = req.file.originalname + "       " + Date.now();
        const storageRef = ref(storage, `files/${newImageName}`);
        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };
        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        if (downloadURL !== "") {
            const newUser = await User.findByIdAndUpdate(
                _id,
                {
                    pictureId: newImageName,
                    picturePath: downloadURL
                },
                {
                    new: true
                }
            );
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
            res.status(201).json({ token, newUser });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error });
    }
}
app.patch("/users/updateUserImage", verifyToken, upload.single("picture"), updateNewUserImage);


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



// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

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