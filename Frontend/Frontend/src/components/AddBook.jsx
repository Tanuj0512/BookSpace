import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ onClose }) => {
  const [newBook, setNewBook] = useState({
    name: "",
    price: "",
    category: "",
    title: "",
    image: null,
  });

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newBook.name);
    formData.append("price", newBook.price);
    formData.append("category", newBook.category);
    formData.append("title", newBook.title);
    formData.append("image", newBook.image);

    try {
        const accessToken = localStorage.getItem('access-token'); // Or however you're storing it
        await axios.post("http://localhost:4000/api/books", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`,
          },
          withCredentials: true, // If you are using cookies
        });
        onClose();
      } catch (error) {
        console.error("Error adding book:", error.response ? error.response.data : error.message);
      }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-900 dark:border-slate-700 border rounded-lg shadow-md p-4 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-pink-800 dark:text-pink-400">
          Add New Book
        </h2>
        <form onSubmit={handleAddBook}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Name"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Price"
              value={newBook.price}
              onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Category"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <input
              type="file"
              onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
              className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-500 text-white p-2 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
