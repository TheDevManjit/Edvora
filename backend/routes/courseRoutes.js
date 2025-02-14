import express from 'express'
import { buyCourse, courseDetails, createCourse,deleteCourse,getCourses,updateCourse } from '../controller/courseController.js';
import  userMiddleware  from '../middleware/userMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
const router = express.Router();

router.post("/create",adminMiddleware,createCourse)
router.put("/update/:course_id",adminMiddleware,updateCourse)
router.delete("/delete/:id",adminMiddleware,deleteCourse)



router.get("/getAll",getCourses)
router.get("/:courseId",courseDetails)
router.post("/buy/:courseId",userMiddleware,buyCourse)

export default router
