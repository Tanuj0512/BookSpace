
import Book from "../model/book.model.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all books
export const getBook = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new book
export const createBook = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, category, title } = req.body;
      const image = req.file ? req.file.path : "";
      const newBook = await Book.create({
        name,
        price,
        category,
        image,
        title,
        userId: req.user.id, // Associate with the logged-in user
      });
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Update a book by ID
export const updateBook = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, category, title } = req.body;
      const image = req.file ? req.file.path : req.body.image;
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      if (book.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" }); // Not authorized to update
      }
      book.name = name;
      book.price = price;
      book.category = category;
      book.image = image;
      book.title = title;
      await book.save();
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" }); // Not authorized to delete
    }
    await book.destroy();
    res.status(204).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};