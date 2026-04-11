import express from 'express';
import { getMe, login, logout, register } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import passport from '../config/passport.js';
import { googleAuthCallback } from '../controllers/googleAuth.controller.js';

const authRouter = express.Router()

//normal auth
authRouter.post('/register', register)
authRouter.get('/me', authMiddleware, getMe)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

//google auth
authRouter.get("/google", passport.authenticate("google", {scope: ["profile", "email"], session: false}));
authRouter.get("/google/callback", passport.authenticate("google", {session: false, failureRedirect: "/auth/login"}), googleAuthCallback);

export default authRouter