import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const AuthRoutes = Router()

AuthRoutes.post("/signup",signup)
AuthRoutes.post("/login",login)
AuthRoutes.get("/user-info",verifyToken,getUserInfo)
export default AuthRoutes;