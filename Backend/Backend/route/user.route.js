import express from "express";
import {
  signup,
  login,
  createPaymentIntent,
  logout,
  checkAuth
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/logout", logout);
router.get('/auth', verifyToken, checkAuth);

export default router;
