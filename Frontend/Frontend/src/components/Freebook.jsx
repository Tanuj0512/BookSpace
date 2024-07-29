import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Freebook() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users", {
          withCredentials: true,
        });
        const fetchedUsers = response.data.map((user) => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          picture: `https://api.multiavatar.com/Binx Bond.svg/${user.fullname}.svg`,
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchUserBooks = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/books/user/${userId}`,
        { withCredentials: true }
      );
      setUserBooks(response.data);
      setSelectedUser(users.find((user) => user.id === userId));
    } catch (error) {
      console.error("Error fetching user books:", error);
      setUserBooks([]);
    }
  };

  const handleUserClick = (userId) => {
    fetchUserBooks(userId);
  };

  const handleBuyClick = (book) => {
    navigate("/checkout", { state: { book } });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8 dark:bg-slate-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-left ml-4 text-pink-800 dark:text-pink-400">
      Authors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={user.picture}
              alt={`${user.fullname}'s avatar`}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{user.fullname}</h3>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-left text-pink-800 dark:text-pink-400">
            Books by {selectedUser.fullname}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.length > 0 ? (
              userBooks.map((book) => (
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
                    <h1 className="text-2xl  font-bold mb-2">{book.title}</h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-1 ">
                      Name: {book.name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      Price: ${book.price}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      Category: {book.category}
                    </p>
                    <button
                      onClick={() => handleBuyClick(book)}
                      className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 mt-4"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No books available for this user.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Freebook;
