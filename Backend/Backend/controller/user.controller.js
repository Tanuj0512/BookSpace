import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {createTokens} from "../middleware/jwt.js"

const stripe = new Stripe(
  "sk_test_51Pdr5sRpxdlTLV2RKOSNdUWPlAvv8qk7Z5d09BJM340Y18k5Y4QlJPXDsawVqtsyQM2v21vcfZ2JbjAIOKIXBXvs00gqRSp8Ew"
);
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = createTokens({ id: user.id, username: user.email, isAdmin: false });
    res.cookie('access-token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Send token as a cookie
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createTokens({ id: user.id, username: user.email, isAdmin: false });
    res.cookie('access-token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Send token as a cookie
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('access-token'); // Clear the cookie
  res.status(200).json({ message: "Logout successful" });
};

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};