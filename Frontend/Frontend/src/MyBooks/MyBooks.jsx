// pages/Courses.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookManager from "../components/BookManager";
import axios from "axios";

function Courses() {
  return (
    <>
      <Navbar />
      <BookManager />
      <Footer />
    </>
  );
}

export default Courses;
