import express from "express";
import {
  getBook,
  deleteBook,
  updateBook,
  getBookById,
  createBook,
} from "../controller/book.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.get("/",verifyToken, getBook);
router.get("/:id",verifyToken, getBookById);
router.post("/",verifyToken, createBook);
router.put("/:id",verifyToken, updateBook);
router.delete("/:id",verifyToken, deleteBook);

export default router;
