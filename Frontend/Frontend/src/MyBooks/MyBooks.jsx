// pages/Courses.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookManager from "../components/BookManager";
import axios from "axios";

function Courses() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
            >
              <h3 className="text-center text-lg font-semibold">
                {user.fullname}
              </h3>
            </div>
          ))}
        </div>
        {selectedUser && (
          <div className="mt-8">
            <BookManager userId={selectedUser.id} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Courses;
