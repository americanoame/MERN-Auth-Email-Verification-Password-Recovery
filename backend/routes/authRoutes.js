import express from "express";
const router = express.Router();
import { login, logout, signup, verifyEmail, forgotPassword, resetPassowrd } from "../controllers/authController.js";



router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);




// router.post("/forgotpassword", forgotPassword);
// router.put("/resetpassword/:resetToken", resetPassowrd);


export default router;
