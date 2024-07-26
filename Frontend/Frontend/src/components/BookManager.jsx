// components/BookManager.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function BookManager({ userId }) {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", author: "", description: "" });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${userId}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`http://localhost:4000/api/books/${editingBook.id}`, formData);
        setEditingBook(null);
      } else {
        await axios.post(`http://localhost:4000/api/users/${userId}/books`, formData);
      }
      setFormData({ title: "", author: "", description: "" });
      fetchBooks();
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  const handleEdit = (book) => {
    setFormData({ title: book.title, author: book.author, description: book.description });
    setEditingBook(book);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-800">Manage Books</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded-md">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="mt-2">{book.description}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(book)}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookManager;
