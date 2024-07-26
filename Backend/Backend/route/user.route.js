import express from "express";
import {
  signup,
  login,
  createPaymentIntent,
  logout,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/logout", logout);

export default router;
