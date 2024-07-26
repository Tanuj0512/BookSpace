import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

function Freebook() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/users-with-books");
        console.log("Fetched users:", res.data); // Check the data structure
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    getUsers();
  }, []);

  const fetchUserBooks = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/users/${userId}/books`);
      setUserBooks(res.data);
    } catch (error) {
      console.log("Error fetching user books:", error);
      setUserBooks([]);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserBooks(user.id);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-800">Users with Books</h1>
      <Slider {...settings}>
        {Array.isArray(users) && users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user)} className="cursor-pointer hover:bg-gray-200 p-4 rounded">
            <h3 className="text-center">{user.fullname}</h3>
          </div>
        ))}
      </Slider>
      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-800">
            Books by {selectedUser.fullname}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.length > 0 ? userBooks.map((book) => (
              <div key={book.id} className="p-4 border rounded shadow-md">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <p className="mt-2">{book.description}</p>
              </div>
            )) : (
              <p className="text-center text-gray-600">No books available for this user.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Freebook;
