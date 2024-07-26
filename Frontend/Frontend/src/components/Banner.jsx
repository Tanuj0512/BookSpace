import React from "react";
import banner from "../../public/Banner.png";
function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-full mt-12 md:mt-36 flex justify-center">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Explore all the books from{" "}
              <span className="text-pink-500">Books store!!!</span>
            </h1>
            <p className="text-sm md:text-xl ">
              A bookstore is a haven for literary enthusiasts, offering a wide
              array of genres, from fiction and non-fiction to academic and
              children's literature. It provides a cozy environment where
              customers can browse, read, and purchase books, often featuring
              comfortable seating areas and quiet reading nooks.
            </p>
          </div>
        </div>
        {/* <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div> */}
      </div>
    </>
  );
}

export default Banner;
