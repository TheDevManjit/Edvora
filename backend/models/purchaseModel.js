import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
},
courseId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Course"
},

})

export const Purchase=mongoose.model("Purchase",purchaseSchema)