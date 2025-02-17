import express from "express";
import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
import { v2 as cloudinary } from 'cloudinary';

// ✅ Create Course
export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    try {
        const { title, desc, educator, price, discountPrice, rating, totalRating, studentEnrolled, language } = req.body;

        if (!title || !desc || !educator || !price || !discountPrice) {
            return res.status(400).json({ error: "All required fields must be provided (title, desc, educator, price, discountPrice)" });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const image = req.files.image;
        const allowedFormat = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({ error: "File format not supported. Only JPEG, PNG, JPG allowed" });
        }

        // ✅ Upload Image to Cloudinary
        console.log("Uploading to Cloudinary...");
        const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath, {
            width: 345,
            height: 340,
            crop: "fit",
        });

        console.log("Cloudinary Response:", cloudResponse);

        if (!cloudResponse || !cloudResponse.public_id || !cloudResponse.secure_url) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
        }

        // ✅ Create New Course
        const newCourse = new Course({
            title,
            desc,
            educator,
            price,
            discountPrice,
            image: {
                public_id: cloudResponse.public_id,
                url: cloudResponse.secure_url
            },
            rating,
            totalRating,
            studentEnrolled,
            language,
            createrId: adminId
        });

        // ✅ Save Course
        const savedCourse = await newCourse.save();
        res.status(200).json({ message: "Course saved successfully", savedCourse });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to save Course" });
    }
};

// ✅ Get All Courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch courses" }); // ✅ Fixed error response
    }
};

// ✅ Update Course
export const updateCourse = async (req, res) => {
    const { course_id } = req.params;
    const adminId = req.adminId; // ✅ Fixed adminId extraction

    const { title, desc, educator, price, discountPrice, rating, totalRatings, studentsEnrolled, language, image } = req.body;

    try {
        const courseSearch = await Course.findById(course_id);
        if (!courseSearch) {
            return res.status(404).json({ error: "Course not found" });
        }

        const course = await Course.findOneAndUpdate(
            { _id: course_id, createrId: adminId },
            {
                title,
                desc,
                educator,
                price,
                discountPrice,
                image: {
                    public_id: image?.public_id,
                    url: image?.url
                },
                rating,
                totalRatings,
                studentsEnrolled,
                language
            },
            { new: true }  // ✅ Return updated document
        );

        if (!course) {
            return res.status(403).json({ error: "Can't update, created by another admin" });
        }

        res.status(200).json({ message: "Course updated successfully", course });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Course update failed", details: error.message });
    }
};

// ✅ Delete Course
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const adminId = req.adminId; // ✅ Fixed adminId extraction

    try {
        const course = await Course.findOneAndDelete({ _id: id, createrId: adminId });

        if (!course) {
            return res.status(404).json({ error: "Course not found or unauthorized to delete" });
        }

        res.status(200).json({ message: "Course deleted successfully", deletedCourse: course });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Course delete failed", details: error.message });
    }
};

// ✅ Get Course Details
export const courseDetails = async (req, res) => {
    const { courseId } = req.params;
    console.log("Requested Course ID:", courseId);

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({ course });

    } catch (error) {
        console.error("Course details error:", error);
        res.status(500).json({ error: "Internal server error while fetching course details" });
    }
};

// ✅ Buy Course
export const buyCourse = async (req, res) => {
    const userId = req.userId; // ✅ Ensure userId exists
    const { courseId } = req.params;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const existingPurchase = await Purchase.findOne({ userId, courseId });
        if (existingPurchase) {
            return res.status(400).json({ error: "You have already purchased this course" });
        }

        const newPurchase = new Purchase({ userId, courseId });
        await newPurchase.save();
        res.status(201).json({ message: "Course purchased successfully", newPurchase });

    } catch (error) {
        console.error("Buy course error:", error);
        res.status(500).json({ error: "Internal server error while purchasing course" });
    }
};
