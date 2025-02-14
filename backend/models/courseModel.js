import { url } from "inspector";
import mongoose from "mongoose";
import { type } from "os";
const {schema} = mongoose

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    educator:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    studentsEnrolled: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        default: 'English'
    },
   
    createrId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    

})

export const Course=mongoose.model("Course",courseSchema)