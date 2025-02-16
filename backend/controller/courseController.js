import express from "express";
import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
import { v2 as cloudinary } from 'cloudinary';
import e from "express";

export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    try {
        const { title, desc, educator, price, discountPrice, rating, totalRating, studentEnrolled, language } = req.body;

        if (!title || !desc || !educator || !price || !discountPrice) {
            return res.status(400).json({ error: "All required fields must be provided (title, desc, educator, price, discountPrice, image)" });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const image = req.files.image;
        const allowedFormat = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({ error: "File format not supported. Only JPEG, PNG, JPG allowed" });
        }

        // ✅ Cloudinary Upload with Logging
        console.log("Uploading to Cloudinary...");
        const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath, {
            width: 345,
            height: 340,
            crop: "fit", // Ensures the image fits within the given dimensions without cropping
          });

        console.log("Cloudinary Response:", cloudResponse);

        if (!cloudResponse || !cloudResponse.public_id || !cloudResponse.secure_url) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
        }

        // ✅ Creating Course with Cloudinary Image URL
        const newCourse = new Course({
            title,
            desc,
            educator,
            price,
            discountPrice,
            image: {
                public_id: cloudResponse.public_id,
                url: cloudResponse.secure_url // ✅ Use secure_url
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

export const getCourses = async (req, res) => {

    try {
        const courses = await Course.find()
        res.status(200).json(courses)
        // console.log(courses)
    } catch (err) {
        res.status(500).error
    }

}

export const updateCourse = async (req, res) => {
    const { course_id } = req.params;
    const { adminId } = req.adminId
    const { title, desc, educator, price, discountPrice, rating, totalRatings, studentsEnrolled, language, image } = req.body;


    try {
        const courseSearch = await Course.findById(course_id)
        if (!courseSearch) {
            return res.status(404).json({ errors: "Course not found" });
        }

        const course = await Course.findOneAndUpdate(
            {
                _id: course_id,
                createrId: adminId
            },
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
            {
                new: true,  // Return the updated document
               
            } 
        )

        if (!course) {
            return res
                .status(404)
                .json({ errors: "can't update, created by other admin" });
        }
        res.status(201).json({ message: "Course updated successfully", course });
    } catch (error) {
        res.status(401).json("course update error", error)
    }

}

export const deleteCourse = async (req, res) => {
    const { id } = req.params; // Get the course ID from request parameters
    const adminId = req.adminId;

    try {
        // Use findOneAndDelete to find a course with a custom query
        const course = await Course.findOneAndDelete({ _id: id });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully", deletedCourse: course });
    } catch (error) {
        res.status(500).json({ error: "Course delete error", details: error.message });
    }
};

export const courseDetails = async (req, res) => {
    const { courseId } = req.params
    console.log(courseId)
    try {

        const course = await Course.findById(courseId)
        console.log(course)
        if (!course) {
            return res.status(404).json({ error: "course hi nhi mila bhai" })
        }
        res.status(200).json({ course })

    } catch (error) {
        res.status(500).json({ error: "Internal error hai bhai" })
        console.log("course details me kuchh gadbad hai bhai ")
    }
}

export const buyCourse = async (req, res) => {
    const { userId } = req;
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId)
        console.log(course)
        console.log(userId)
        if (!course) {
            return res.status(404).json({ error: "course not found" })
        }
        const exitingPurchase = await Purchase.findOne({ userId, courseId })
        if (exitingPurchase) {
            return res.status(400).json({ error: "You have already purchased this course" })
        }

        const newPurchase = new Purchase({ userId, courseId })
        await newPurchase.save()
        res.status(201).json({ message: "course purchased successfully", newPurchase })

    }
    catch (error) {
        res.status(500).json({ error: "Internal error hai bhai courseBuy" })
        console.log("Buycourse details me kuchh gadbad hai bhai ")
    }
}
