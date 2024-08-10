import React, { useState } from "react";
import DeleteIcon from "../Features/Icons/DeleteIcon";
import EditIcon from "../Features/Icons/EditIcon";
import ClockIcon from "../Features/Icons/ClockIcon";
import { Link, useNavigate } from "react-router-dom";

function BookDetails({ selectedBook, loggedInUserId, onDelete }) {
  const navigate = useNavigate();

  const handleRequest = (type) => {
    fetch("https://booktrade-api.onrender.com/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        bookId: selectedBook._id,
        ownerId: selectedBook.postedBy._id,
        request: type, // Use the provided type
        status: "pending",
      }),
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.message === "Exchange notification created successfully") {
          // Request successful, you can handle this as needed
          // alert(`Request for ${type} sent successfully.`);
          navigate("/notification");
        } else {
          // Request failed
          alert("Failed to send request. Please try again later.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again later.");
      });
  };

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

  // if (!selectedBook) {
  //   return <div>Loading...</div>;
  // }

  // Check if the user is the owner of the post
  const isOwner = selectedBook.postedBy._id === loggedInUserId;

  const handleDeleteBook = () => {
    // Call the onDelete function to handle book deletion
    onDelete();
  };

  const remainingDays = () => {
    const currentDate = new Date();
    const oldDate = new Date(selectedBook.availabledate);
    const timeDifference = oldDate - currentDate;
    const dayRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayRemaining;
  };

  function handleSendMessage(userId) {
    // Make a fetch request to create or retrieve a chat
    fetch("https://booktrade-api.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ userId: userId }), // Include the userId in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the chat page using the chatId from the response
        navigate(`/message/${data.chatId}`);
      })
      .catch((error) => {
        console.error("Error creating/retrieving chat:", error);
      });
  }

  return (
    <div className="container max-w-md mx-auto px-4 my-4">
      <div key={selectedBook._id}>
        <div
          className={`flex flex-col px-4 py-4 border-2 rounded-lg ${
            colorClassBa[selectedBook.bookCoverColor] || ""
          }`}
        >
          {isOwner && (
            <div className="flex flex-row-reverse mx-0 my-0">
              <button className="" onClick={handleDeleteBook}>
                <DeleteIcon />
              </button>
              <Link to={`/editbook/${selectedBook._id}`}>
                <div className="mr-4">
                  <EditIcon />
                </div>
              </Link>
              <Link to={`/availability/${selectedBook._id}`}>
                <div className="mr-4">
                  <ClockIcon />
                </div>
              </Link>
            </div>
          )}

          <div className="mx-auto py-4 ">
            <img
              className="h-[300px]"
              src={selectedBook.bookCover}
              alt={selectedBook.bookName}
            />
          </div>
          <div>
            <h1 className="font-r tracking-wide line-clamp-1 text-3xl my-2">
              {selectedBook.bookName}
            </h1>
          </div>
          <div>
            <p className="font-r tracking-wide line-clamp-1 text-base">
              by {selectedBook.authorName}
            </p>
          </div>
          <div>
            <p className="font-r tracking-wide line-clamp-1 text-base text-gray-600">
              Book Status: {selectedBook.bookCondition}
            </p>
          </div>
          <div className="mt-3">
            {selectedBook.availability === "Available" ? (
              <p className="font-r tracking-wide text-base text-green-500">
                {selectedBook.availability}
              </p>
            ) : (
              <p className="font-r tracking-wide text-base text-red-500">
                Available in {remainingDays()} days
              </p>
            )}
          </div>
        </div>
        <div>
          {!isOwner && selectedBook.availability === "Available" && (
            <div className="my-8 flex flex-row gap-2 ">
              <button
                className="font-r tracking-wider basis-1/2 border-solid border-2 rounded-lg py-2 bg-purple-500 text-white hover:bg-purple-600 text-lg border-purple-500"
                onClick={() => handleRequest("exchange")}
              >
                Exchange
              </button>
              <button
                className="font-r tracking-wider basis-1/2 border-solid border-2 rounded-lg py-2 bg-slates-100 hover:border-purple-500 text-lg"
                onClick={() => handleRequest("borrow")}
              >
                Borrow
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-row bg-purple-100 border-2 rounded-lg border-purple-300 px-4 py-4 my-4">
          <div className="basis-1/4 flex justify-center">
            <img
              className="h-[80px] w-[80px] mx-2 my-1 border-solid rounded-full border-2 border-purple-500"
              src={selectedBook.postedBy.profilePic}
              alt="book.title"
            />
          </div>
          <div className="basis-3/4 content place-self-center pr-2">
            <div className="grid grid-row text-left text-base mx-6">
              <Link to={`/user/${selectedBook.postedBy._id}`}>
                <h2 className="pe-1 font-r tracking-wide line-clamp-1 text-xl text-purple-500">
                  {selectedBook.postedBy.name}
                </h2>
              </Link>
              <div className="mt-2">
                {/* <Link to={navigate(`/chat/${selectedBook.postedBy._id}`)}> */}
                {!isOwner && (
                  <button
                    className="font-r tracking-wider basis-1/2 border-solid border-2 rounded-lg py-1 px-8 scroll-px-36 bg-purple-500 text-white hover:bg-purple-600 text-lg "
                    onClick={() => handleSendMessage(selectedBook.postedBy._id)} // Use the callback function
                  >
                    Message
                  </button>
                )}

                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
