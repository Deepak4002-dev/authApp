import express from 'express'
import { login, signUp, logout } from '../controllers/auth.controller.js'
import {isUser} from '../middlewares/authMiddleware.js'
import {loginValidator,signupValidator} from '../middlewares/validators.js'

const router = express.Router()

router.post("/signup",signupValidator,signUp)
router.post("/login",loginValidator,login)
router.post("/logout",logout);

router.get("/user-dashboard", isUser, (req, res) => {
  res.json({ message: "Welcome to your Dashboard!", user: req.user });
});

export default router