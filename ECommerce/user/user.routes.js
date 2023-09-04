import express from "express";
import { loginUser, registerUser } from "./user.service.js";

const router = express.Router();

// Register User
router.post("/user/register", registerUser)

// Login User
// ! if we have body in req.. than it cannot be get request
router.post("/user/login", loginUser)

export default router