
import Book from "../model/book.model.js";
import multer from "multer";
import path from "path";
import User from "../model/user.model.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


// Get all books for market place
export const getBook = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all books uploaded by the logged-in user
export const getBookByLoggedUser = async (req, res) => {
  console.log("getBookByLoggedUser called with userId:", req.params.userId); // Debug log
  try {
    const userId = req.params.userId;
    const books = await Book.findAll({ where: { userId } });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific book uploaded by the logged-in user
export const getBookByLoggedUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from the JWT token
    const bookId = req.params.id;

    const book = await Book.findOne({ where: { id: bookId, userId } });

    if (!book) {
      return res.status(404).json({ message: "Book not found or does not belong to user" });
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
      if (!name || !price || !category || !title) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newBook = await Book.create({
        name,
        price,
        category,
        image,
        title,
        userId: req.user.id,
      });
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
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
      const book = await Book.findOne({ where: { id, userId: req.user.id } });
      if (!book) {
        return res.status(404).json({ message: "Book not found or not authorized" });
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
    const book = await Book.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found or not authorized" });
    }
    await book.destroy();
    res.status(204).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};