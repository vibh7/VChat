import { Router } from "express";
import { addProfileImage, getUserInfo, login, logout, removeProfileImage, signup, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
const AuthRoutes = Router()
const upload = multer({dest : "uploads/profiles/"})
AuthRoutes.post("/signup",signup)
AuthRoutes.post("/login",login)
AuthRoutes.get("/user-info",verifyToken,getUserInfo)
AuthRoutes.post("/update-profile",verifyToken,updateProfile)
AuthRoutes.post("/add-profile-image",verifyToken,upload.single("profile-image"),addProfileImage)
AuthRoutes.delete("/delete-profile-image",verifyToken,removeProfileImage)
AuthRoutes.post("/logout",logout);
export default AuthRoutes;