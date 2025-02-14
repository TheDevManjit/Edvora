import express from 'express'
import { login, logout, signup ,purchases} from '../controller/userController.js';
import userMiddleware from '../middleware/userMiddleware.js';

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)
router.get("/purchases",userMiddleware,purchases)

export default router
