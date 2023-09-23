import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function BookList({ data, loggedInUserId }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleBooks, setVisibleBooks] = useState(10); // Number of initially visible books
  const navigate = useNavigate();

  const colorClassBa = {
    gray: "bg-gray-100 border-gray-300",
    red: "bg-red-100 border-red-300",
    orange: "bg-orange-100 border-orange-300",
    yellow: "bg-yellow-100 border-yellow-300",
    lime: "bg-lime-100 border-lime-300",
    green: "bg-green-100 border-green-300",
    teal: "bg-teal-100 border-teal-300",
    blue: "bg-blue-100 border-blue-300",
    indigo: "bg-indigo-100 border-indigo-300",
    violet: "bg-violet-100 border-violet-300",
    purple: "bg-purple-100 border-purple-300",
    pink: "bg-pink-100 border-pink-300",
  };

  // Function to load more books
  const loadMoreBooks = () => {
    setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + 10); // Load the next 10 books
  };

  // Add a scroll event listener to detect when the user reaches the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // User has scrolled to the bottom, load more books
        loadMoreBooks();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!data) {
    return (
      <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
        Loading...
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
        No Books Found
      </div>
    );
  }

  const handleGetThisBookClick = (book) => {
    setSelectedBook(book);
    navigate(`/detail/${book._id}`);
  };

  // Determine whether there are more books to load
  const moreBooksToLoad = visibleBooks < data.length;

  return (
    <div className="container max-w-md mx-auto px-4 py-6 ">
      <div className="grid grid-cols-1 gap-5 w-full text-left ">
        {data.slice(0, visibleBooks).map((book) => {
          const backgroundColorClass = colorClassBa[book.bookCoverColor] || "";
          const isOwner = book.postedBy._id === loggedInUserId;

          return (
            <div
              key={book._id}
              className={`flex flex-row border-2 rounded-lg ${backgroundColorClass} shadow-md`}
            >
              <div className="basis-1/2 flex justify-center">
                <img
                  className=" h-[200px] object-cover pl-2 py-4"
                  src={book.bookCover}
                  alt={book.bookName}
                />
              </div>
              <div className="basis-1/2 content place-self-center pr-2">
                <h2 className="text-lg font-r font-semibold line-clamp-1 text-gray-700">
                  {book.bookName}
                </h2>
                <p className="text-gray-600 font-r font-normal line-clamp-1 ">
                  {book.authorName}
                </p>
                <Link to={`/user/${book.postedBy._id}`}>
                  <p className="text-purple-500 font-m font-normal mt-2 line-clamp-1">
                    {book.postedBy.name}
                  </p>
                </Link>
                <div>
                  {book.availability === "Available" ? (
                    <p className="font-r tracking-wide text-base text-green-500">
                      {book.availability}
                    </p>
                  ) : (
                    <p className="font-r tracking-wide text-base text-red-500">
                      {book.availability}
                    </p>
                  )}
                </div>
                <div className="">
                  <button
                    className="bg-purple-600 text-white rounded px-4 py-2 mt-2"
                    onClick={() => {
                      handleGetThisBookClick(book);
                    }}
                  >
                    <span className="line-clamp-1">
                      {isOwner ? "Manage your book" : "Get this Book"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Conditionally render the "Load More" button */}
      {moreBooksToLoad && (
        <div className="flex justify-center mt-8">
          <button
            className=" text-gray-700 rounded px-4 py-2 text-lg font-r tracking-wide hover:text-purple-500"
            onClick={loadMoreBooks}
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
}

export default BookList;
