import React from "react";
import member1 from "../Images/person1.png";
import member2 from "../Images/person2.png";
import member3 from "../Images/person3.png";
import book from "../Images/Books.png";
import Navbar from "../components/Navbar";

function AboutUs() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="mt-10 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl w-full transform transition-all hover:scale-105">
          <h2 className="text-5xl font-extrabold mb-10 text-center text-pink-800 dark:text-pink-400">
            About Us
          </h2>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <img
              src={book}
              alt="Team Photo"
              className="w-60 h-60 rounded-xl shadow-xl mb-6 md:mb-0 md:mr-8 transition-transform transform hover:scale-110"
            />
            <div>
              <p className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                Our Story
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                convallis libero ac lorem efficitur, eget tempus dui mollis.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vivamus ut dolor vitae nisl
                malesuada feugiat non eu tortor.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <div>
              <p className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                Our Mission
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Integer vel pharetra diam. In
                sit amet scelerisque arcu, et hendrerit nisi. Donec faucibus
                arcu ut lectus fermentum, id convallis nunc malesuada.
                Suspendisse potenti.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <div>
              <p className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                Our Team
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                Etiam consequat turpis ac lorem interdum, id ullamcorper est
                dictum. Vivamus non dui nisl. Fusce varius leo ac auctor
                aliquam. Duis egestas nisi vel nulla cursus, in facilisis quam
                varius. Integer at felis a justo ornare gravida.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-3xl font-extrabold text-purple-700 dark:text-purple-300 mb-8">
              Meet Our Team
            </h3>
            <div className="flex justify-center space-x-20">
              <div className="text-center transform transition-all hover:scale-110">
                <img
                  src={member1}
                  alt="Member 1"
                  className="w-32 h-32 rounded-full shadow-xl mb-4"
                />
                <p className="text-gray-800 dark:text-gray-200 font-bold">John Doe</p>
                <p className="text-gray-500 dark:text-gray-400">CEO</p>
              </div>
              <div className="text-center transform transition-all hover:scale-110">
                <img
                  src={member2}
                  alt="Member 2"
                  className="w-32 h-32 rounded-full shadow-xl mb-4"
                />
                <p className="text-gray-800 dark:text-gray-200 font-bold">Jane Smith</p>
                <p className="text-gray-500 dark:text-gray-400">CTO</p>
              </div>
              <div className="text-center transform transition-all hover:scale-110">
                <img
                  src={member3}
                  alt="Member 3"
                  className="w-32 h-32 rounded-full shadow-xl mb-4"
                />
                <p className="text-gray-800 dark:text-gray-200 font-bold">Bob Johnson</p>
                <p className="text-gray-500 dark:text-gray-400">COO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
