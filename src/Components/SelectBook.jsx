import React, { useState } from "react"; //,  , useEffect
import { useNavigate, Link, useParams } from "react-router-dom";

function BookList({ data, loggedInUserId }) {
  const { NotificationId } = useParams();
  const [selectedBook, setSelectedBook] = useState(null);
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

  //   const handleGetThisBookClick = (book) => {
  //     setSelectedBook(book);
  //     navigate(`/detail/${book._id}`);
  //   };

  const handleGetThisBookClick = async (book) => {
    setSelectedBook(book);
    try {
      const response = await fetch("https://booktrade-api.onrender.com/notification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          notificationId: NotificationId, // Assuming you have NotificationId in your component's state
          newStatus: "accept", // Set the new status as needed
          newRespondBookId: book._id, // Set the new respondBookId to the book's ID
          newRequest: "exchange",
        }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        // console.log("Notification updated successfully");
        navigate(`/notification`);
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6 ">
      <div className="grid grid-cols-1 gap-5 w-full text-left ">
        {data.map((book) => {
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
                <div>
                  <p className="text-gray-600 font-r font-normal mt-2 line-clamp-1">
                    {book.bookCondition}
                  </p>
                </div>
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
                {book.availability === "Available" ? (
                  <div className="">
                    <button
                      className="bg-purple-600 text-white rounded px-4 py-2 mt-2 "
                      onClick={() => {
                        //   navigate(`/notification`)
                        handleGetThisBookClick(book);
                      }}
                    >
                      Select this Book
                      {/* {isOwner ? "Manage your book" : "Get this Book"} */}
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <button className="bg-purple-400 text-white rounded px-4 py-2 mt-2 ">
                      Select this Book
                      {/* {isOwner ? "Manage your book" : "Get this Book"} */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookList;
