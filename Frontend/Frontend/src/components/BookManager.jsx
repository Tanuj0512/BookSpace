import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./AddBook"; 

const UserBooks = () => {
  const [books, setBooks] = useState([]);
  const [isAddBookVisible, setIsAddBookVisible] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const userId = 1; 

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/books/user/${userId}`,
        { withCredentials: true }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching user books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/${id}`, {
        withCredentials: true,
      });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto p-4 dark:bg-slate-800 dark:text-white mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-800 dark:text-pink-400">
        My Books
      </h1>

      {/* Button to toggle AddBook form */}
      <div className="mb-4 text-right mr-8">
        <button
          onClick={() => setIsAddBookVisible(true)}
          className="bg-blue-500 text-white p-2 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add New Book
        </button>
      </div>

      {/* Show AddBook component */}
      {isAddBookVisible && <AddBook onClose={() => setIsAddBookVisible(false)} />}

      {/* Edit book form */}
      {editBook && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-900 dark:border-slate-700 border rounded-lg shadow-md p-4 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center text-pink-800 dark:text-pink-400">
              Edit Book
            </h2>
            {/* Edit book form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("name", editBook.name);
                formData.append("price", editBook.price);
                formData.append("category", editBook.category);
                formData.append("title", editBook.title);
                if (editBook.image instanceof File) {
                  formData.append("image", editBook.image);
                }

                try {
                  await axios.put(`http://localhost:4000/api/books/${editBook.id}`, formData, {
                    withCredentials: true,
                  });
                  fetchBooks();
                  setEditBook(null);
                } catch (error) {
                  console.error("Error updating book:", error);
                }
              }}
            >
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={editBook.name}
                  onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
                  className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Price"
                  value={editBook.price}
                  onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
                  className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Category"
                  value={editBook.category}
                  onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
                  className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={editBook.title}
                  onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div className="mb-2">
                <input
                  type="file"
                  onChange={(e) => setEditBook({ ...editBook, image: e.target.files[0] })}
                  className="w-full p-2 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white p-2 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditBook(null)}
                  className="bg-gray-500 text-white p-2 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded-lg shadow-md dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <img
              src={`http://localhost:4000/uploads/${book.image}`}
              alt={book.title}
              className="w-full h-48 object-cover mb-4 rounded-t-lg"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Name: {book.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Price: ${book.price}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Category: {book.category}
              </p>
              <div className="w-32 flex justify-between mt-4">
                <button
                  onClick={() => setEditBook(book)}
                  className="bg-yellow-500 text-white p-2 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="bg-red-500 text-white p-2 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooks;
