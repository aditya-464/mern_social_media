import mongoose from "mongoose";
const DB = process.env.MONGO_URL;
mongoose.connect(DB).then(()=>{
    console.log("Connection with database is Successful!");
}).catch((err)=>{
    console.log("Connection with database Failed!", err);
});