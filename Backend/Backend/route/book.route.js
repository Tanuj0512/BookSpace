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
const router = express.Router();

router.get("/",verifyToken, getBook);
router.get("/users", getUsers);
// router.get("/:id", verifyToken, getBookById);
router.get("/books/user/:userId", getBookByLoggedUser); // Ensure this endpoint is defined
router.get("/books/user/:id", getBookByLoggedUserId);

router.post("/books", createBook);
router.put("/books/:id",  updateBook);
router.delete("/books/:id",  deleteBook);

export default router;
