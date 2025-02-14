import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import courseRoute from './routes/courseRoutes.js'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoutes.js'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI

app.use(express.json()); // Enable JSON request parsing
app.use(cookieParser());
app.use(cors({
    origin: process.env.Frontend_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET, POST, PUT, DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    
}));

console.log(process.env.STRING)
console.log(DB_URI)


// Enable file upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// Connect to MongoDB

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit process if database connection fails
    }
};



app.use("/api/v1/course",courseRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute)
// console.log(process.env.CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET)

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});


// Call database connection
connectDB(); 
//defining Route


app.get("/",(req,res)=>{
    res.send("Hello world")
})



app.listen(port,()=>{
  console.log("port is listing at",port)
})