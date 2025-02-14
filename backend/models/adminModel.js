import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  lastname: {
    type: String,
   
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Ensures phone number is unique
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Validates phone format
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Converts email to lowercase
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Validates email format
  },
  password: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing spaces
    minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
    select: false, // Prevents password from being returned in queries
  }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
