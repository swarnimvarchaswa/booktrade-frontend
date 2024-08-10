import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddReadinglist() {
  const navigate = useNavigate();
  const [readinglist, setReadinglist] = useState("");
  const [bookNameError, setBookNameError] = useState("");


  const addToReadinglist = () => {
    if (!readinglist) {
      setBookNameError("Enter Book Name");
      return;
    }

    fetch("https://booktrade-backend.vercel.app//addreadinglist", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        readinglist: readinglist,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setReadinglist("");
          setBookNameError("");
          navigate("/profile?tab=2");
        }
      });
  };

  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
      <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mb-8 mt-4 text-left">
        Reading List
      </h2>
      <div className="mb-6 font-r tracking-wider">
        <input
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          type="text"
          id="readinglist"
          name="readinglist"
          value={readinglist}
          placeholder="Book Name"
          onChange={(e) => {
            setReadinglist(e.target.value);
          }}
        />
        {bookNameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {bookNameError}
          </p>
        )}
      </div>
      <div className="grid justify-streatch  font-r tracking-wider">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-2 px-4 rounded-md"
          onClick={() => {
            setBookNameError("");
            addToReadinglist();
            // postData();
          }}
        >
          Add Book
        </button>
      </div>
    </div>
  );
}

export default AddReadinglist;
