import express from 'express'
import { string, z } from "zod";
import jwt from 'jsonwebtoken'
import JWT_USER_PASSWORD from '../config.js'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import {Purchase} from '../models/purchaseModel.js'
import { Course } from "../models/courseModel.js";
import config from '../config.js';

export const signup = async (req, res) => {
    const { firstname, lastname, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if all fields are provided
    if (!firstname || !lastname || !phone || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const UserSchema = z.object({
        firstname: z.string().min(2, { message: "first name aleat 2 char" }).max(20),
        lastname: z.string().min(2, { message: "last name aleat 2 char" }).max(20),
        phone: z.string().min(10, { message: "number at leat 10" }),
        email: z.string().email({ message: "email mus include @email.com" }),
        password: string().min(6, { message: "password must have 6 char" })
    })

    const validateData = UserSchema.safeParse(req.body)
    if (!validateData.success) {
        return res.status(401).json({ error: validateData.error.issues.map(err => err.message) })
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            return res.status(402).json({ error: "Email or Phone already exists" });
        }

        // Create a new user if not found
        const user = await User.create({ firstname, lastname, phone, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Duplicate entry detected. Email or Phone must be unique." });
        }
        res.status(500).json({ error: "User creation error", details: err.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if required fields are provided
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all required fields" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email }).select("+password"); // Include password since it's hidden by default

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // jwt 
        console.log(JWT_USER_PASSWORD)
        const token = jwt.sign({
            id: user._id,

        }, process.env.JWT_USER_PASSWORD,
            { expiresIn: "1d" })

            const cookieOption = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "Strict"
            };


            res.cookie("jwt", token, cookieOption);
            res.status(201).json({ message: "Login successful", token, user });
        console.log(user)

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        res.status(400).json({ error: "error in log out" })
    }
}

export const purchases = async (req, res) => {
 const userId = req.userId

 try {
     const  purchased = await Purchase.find({userId})
     let purchasedCourses = []

     for(let i=0; i<purchased.length; i++){
         purchasedCourses.push(purchased[i].courseId)
     }
      const coursesData = await Course.find({_id:{$in:purchasedCourses}})
     console.log(purchasedCourses)
     res.status(200).json({purchasedCourses,coursesData})
 }
 catch (error) {
     res.status(500).json({error:"internal error in purchases"})
 }  

}
