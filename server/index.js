import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from 'morgan'
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import { verifyToken } from "./middlewares/auth.js";


// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: "./config.env" });
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

// File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}+${Date.now()}`);
    }
});
const upload = multer({ storage });

// Routes with files
// app.post("/auth/setupaccount", upload.single("picture"), setupAccount);
app.use("/auth", authRoutes);

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Routes with files
app.use("/posts", verifyToken, upload.single("picture"));


// Connection with Database
const DB = process.env.MONGO_URL;
mongoose.connect(DB).then(() => {
    console.log("Connection with database is Successful!");
}).catch((err) => {
    console.log("Connection with database Failed!", err);
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
    console.log(`Server is running on PORT :  ${PORT}`);
})