import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookCover, setBookCover] = useState("");
  const [bookCondition, setBookCondition] = useState("");
  const [bookCoverColor, setBookCoverColor] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the book data to pre-fill the form
    fetch(`https://booktrade-backend.vercel.app/editbook/${bookId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          // Handle the error (e.g., book not found)
        } else {
          // Set the book data
          setBookName(data.bookName);
          setAuthorName(data.authorName);
          setBookCover(data.bookCover); // Set the image URL for preview
          setBookCondition(data.bookCondition);
          setBookCoverColor(data.bookCoverColor);
        }
      })
      .catch((err) => console.error(err));
  }, [bookId]);

  const validateFields = () => {
    // Validation logic
    let isValid = true;
    const newErrors = {};

    if (!bookName) {
      newErrors.bookNameError = "Enter Book Name";
      isValid = false;
    }

    if (!authorName) {
      newErrors.authorNameError = "Enter Author Name";
      isValid = false;
    }

    if (!bookCover) {
      newErrors.bookCoverError = "Select a Book Cover";
      console.log(newErrors.bookCoverError);
      isValid = false;
    }

    if (!bookCondition) {
      newErrors.bookConditionError = "Select Book Condition";
      isValid = false;
    }

    if (!bookCoverColor) {
      newErrors.bookCoverColorError = "Select Book Cover Color";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const postDetails = () => {
    if (validateFields()) {
      const data = {
        bookName,
        authorName,
        bookCondition,
        bookCoverColor,
      };
      setIsLoading(true);

      fetch(`https://booktrade-backend.vercel.app/editbook/${bookId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("Response from the server:", data);
          if (data.error) {
            console.error(data.error);
            // Handle the error
          } else {
            // Book updated successfully
            navigate("/profile");
          }
        })
        .catch((err) => console.error(err));
      setErrors("an Unexpected error occured.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
      <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mb-8 mt-4 text-left">
        Edit Book
      </h2>
      <div className="mb-6 font-r tracking-wider">
        <input
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          type="text"
          id="bookName"
          name="bookName"
          value={bookName}
          placeholder="Book Name"
          onChange={(e) => setBookName(e.target.value)}
        />
        {errors.bookNameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {errors.bookNameError}
          </p>
        )}
      </div>
      <div className="mb-6 font-r tracking-wider">
        <input
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          type="text"
          id="authorName"
          name="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name"
        />
        {errors.authorNameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {errors.authorNameError}
          </p>
        )}
      </div>

      {/* Other input fields and error messages (similar to your previous code) */}
      <div className="mb-6 ml-4">
        {bookCover && (
          <img
            className="max-h-40 w-auto"
            id="bookCoverPreview"
            src={bookCover}
            alt="Book Cover Preview"
          />
        )}
      </div>

      <div className="mb-6">
        <select
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          id="bookCondition"
          name="bookCondition"
          value={bookCondition}
          // onChange={(e) => setBookCondition({ bookCondition: e.target.value })}
          onChange={(e) => setBookCondition(e.target.value)}
        >
          <option disabled value="">
            Book Condition
          </option>
          <option value="Almost new">Almost New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </select>
        {errors.bookConditionError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {errors.bookConditionError}
          </p>
        )}
      </div>

      {/* color */}
      <div className="mb-6">
        <select
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          id="color"
          name="color"
          value={bookCoverColor}
          onChange={(e) => setBookCoverColor(e.target.value)}
        >
          <option disabled value="">
            Color of Book Cover
          </option>
          <option value="gray">Gray</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="lime">Yellow Green</option>
          <option value="green">Green</option>
          <option value="teal">Green Blue</option>
          <option value="blue">Blue</option>
          <option value="indigo">Blue Voilet</option>
          <option value="violet">Violet</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
        </select>
        {errors.bookCoverColorError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {errors.bookCoverColorError}
          </p>
        )}
      </div>

      <div className="grid justify-stretch mt-10 font-r tracking-wider">
        {/* <button
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-2 px-4 rounded-md"
          onClick={postDetails}
        >
          Save Changes
        </button> */}
        <button
          className={`${
            isLoading ? "bg-purple-600 py-[1px]" : "bg-purple-600 hover:bg-purple-700 py-3"
          } text-white rounded flex items-center justify-center`}
          onClick={postDetails}
          disabled={isLoading}
        >
          {isLoading ? (
            <img
              className="h-10 "
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
              alt="Loading"
            /> // Replace with your loading image path
          ) : (
            <div>Save Changes</div>
          )}
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default EditBook;
