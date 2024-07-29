import React from "react";
import Navbar from "../components/Navbar";

function ContactForm() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Contact Us
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 p-2 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
