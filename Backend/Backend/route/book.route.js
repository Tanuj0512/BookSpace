import express from "express";
import {
  getBook,
  deleteBook,
  updateBook,
  //   getBookById,
  createBook,
  getBookByLoggedUser,
  getBookByLoggedUserId,
  getUsers,
} from "../controller/book.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js"

const router = express.Router();

router.get("/books", getBook);
router.get("/users", getUsers);
router.get("/books/user/:userId", getBookByLoggedUser);
router.get("/books/user/:id", getBookByLoggedUserId);

router.post('/addBooks', verifyToken,upload.single('image'), createBook);
router.put('/books/:id', verifyToken, upload.single('image'), updateBook);
router.delete('/books/:id', verifyToken, deleteBook);

export default router;
