import express from 'express'
import { string, z } from "zod";
import jwt from 'jsonwebtoken'
import JWT_ADMIN_PASSWORD from '../config.js'
import bcrypt from 'bcrypt'
import Admin from '../models/adminModel.js'
import config from '../config.js';
import cookieParser from 'cookie-parser';

export const signup = async (req, res) => {
    const { firstname, lastname, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if all fields are provided
    if (!firstname || !phone || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const adminSchema = z.object({
        firstname: z.string().min(2, { message: "first name aleat 2 char" }).max(20),
        //   lastname: z.string().min(2, { message: "last name aleat 2 char" }).max(20),
        phone: z.string().min(10, { message: "number at leat 10" }),
        email: z.string().email({ message: "email mus include @email.com" }),
        password: string().min(6, { message: "password must have 6 char" })
    })

    const validateData = adminSchema.safeParse(req.body)
    if (!validateData.success) {
        return res.status(400).json({ error: validateData.error.issues.map(err => err.message) })
    }

    try {
        // Check if the user already exists
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }] });

        if (existingAdmin) {
            return res.status(400).json({ error: "Email or Phone already exists" });
        }

        // Create a new user if not found
        const admin = await Admin.create({ firstname, lastname, phone, email, password: hashedPassword });

        res.status(201).json({ message: "Admin created successfully", Admin });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Duplicate entry detected. Email or Phone must be unique." });
        }
        res.status(500).json({ error: "Admin creation error", details: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if required fields are provided
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter User Name or Password fields" });
    }

    try {
        // Find user by email
        const admin = await Admin.findOne({ email }).select("+password"); // Include password since it's hidden by default

        // Check if user exists
        if (!admin) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // jwt 
         console.log(config.JWT_ADMIN_PASSWORD)
        const token = jwt.sign({
            id: admin._id,

        }, config.JWT_ADMIN_PASSWORD,
            { expiresIn: "1d" })

     const cookieExpireTime = Number(process.env.JWT_COOKIE_EXPIRE) || 1
     const cookieOption = {
        expires: new Date(Date.now() + cookieExpireTime * 24 * 60 * 60 * 1000), // Ensure it's a valid number
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Strict"
    };
    
    res.cookie("jwt", token, cookieOption);

        res.status(200).json({ message: "Login successful" });
        console.log(admin)

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout =  (req, res) => {
    try {
        if(!req.cookies.jwt){
            return res.status(400).json({error:"You are not logged in"})
        }
        res.clearCookie("jwt")
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        res.status(400).json({ error: "error in log out" })
    }
}