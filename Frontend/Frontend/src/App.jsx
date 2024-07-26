import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./MyBooks/MyBooks";
import Signup from "./components/Signup";
import MarketPlace from "./Market/Market";
import Contact from "./Contact/Contact";
import About from "./About/About"
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./components/checkout";
import Navbar from "./components/Navbar";
const stripePromise = loadStripe(
 " pk_test_51Pdr5sRpxdlTLV2Rn5CCowMQiMuYz66fzstAj9GPNrywGWanzSqqamx7pHIuFQAK9r82KA4sjSoRKtuIceQb4MS200i5PFQJjg"
);

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Elements stripe={stripePromise}>
        <div className="dark:bg-slate-900 dark:text-white">
         
          <Routes>
         
            <Route path="/" element={<Home />} />
            <Route
              path="/course"
              element={authUser ? <Courses /> : <Navigate to="/signup" />}
            />
            <Route
              path="/market"
              element={authUser ? <MarketPlace /> : <Navigate to="/signup" />}
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Toaster />
        </div>
      </Elements>
    </>
  );
}

export default App;
