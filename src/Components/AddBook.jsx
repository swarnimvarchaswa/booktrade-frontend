import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [bookNameError, setBookNameError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorNameError, setAuthorNameError] = useState("");
  const [bookCover, setBookCover] = useState(null);
  const [bookCoverError, setBookCoverError] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [bookCondition, setBookCondition] = useState("");
  const [bookConditionError, setBookConditionError] = useState("");
  const [bookCoverColor, setBookCoverColor] = useState("");
  const [bookCoverColorError, setBookCoverColorError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    let isValid = true;

    if (!bookName) {
      setBookNameError("Enter Book Name");
      isValid = false;
    } else if (!authorName) {
      setAuthorNameError("Enter Author Name");
      isValid = false;
    } else if (!bookCover) {
      setBookCoverError("Select Book Cover");
      isValid = false;
    } else if (!bookCondition) {
      setBookConditionError("Choose your boook Status");
      isValid = false;
    } else if (!bookCoverColor) {
      setBookCoverColorError("Choose your book cover color");
      isValid = false;
    }

    return isValid;
  };

  const postDetails = () => {
    //posting image t cloudinary
    if (validateFields()) {
      if (
        bookName &&
        authorName &&
        bookCondition &&
        bookCoverColor &&
        bookCover
      ) {
        setIsLoading(true);  

        const data = new FormData();
        data.append("file", bookCover);
        data.append("upload_preset", "BookCover");
        data.append("cloud_name", "booktrade");
        fetch("https://api.cloudinary.com/v1_1/booktrade/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => setUrl(data.url))
          .catch((err) => console.log(err));
      } else {
        // console.log("Enter all the details");
      }
    }
  };
  const loadfile = (event) => {
    setBookCover(event.target.files[0]);
  };

  useEffect(() => {
    if (url) {
      //saving post to mongodb
      fetch("https://booktrade-api.onrender.com/addbook", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          bookName,
          authorName,
          pic: url,
          bookCondition,
          bookCoverColor,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            if (data.error === "bookNameError") {
              setBookNameError("Enter Book Name");
              setIsLoading(false);
            } else if (data.error === "authorNameError") {
              setAuthorNameError("Enter Author Name");
              setIsLoading(false);
            } else if (data.error === "urlError") {
              setUrlError("Something went wrong");
            
            } else if (data.error === "bookConditionError") {
              setBookConditionError("Choose your boook Status");
              setIsLoading(false);
            } else if (data.error === "bookCoverColorError") {
              setBookCoverColorError("Choose your book cover color");
              setIsLoading(false);
            }
            // error messages
          } else {
            //success messsage
            navigate("/profile");
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url, bookName, authorName, bookCondition, bookCoverColor, navigate]);

  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col ">
      <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mb-8 mt-4 text-left">
        Add Books
      </h2>
      <div className="mb-6 font-r tracking-wider">
        <input
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          type="text"
          id="bookName"
          name="bookName"
          value={bookName}
          placeholder="Book Name"
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        />
        {bookNameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {bookNameError}
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
          onChange={(e) => {
            setAuthorName(e.target.value);
          }}
          placeholder="Author Name"
        />
        {authorNameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {authorNameError}
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="relative text-left rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white " style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {bookCover ? (
            <p className="absolute left-0 top-0 font-r text-gray-700 px-3 py-2 line-clamp-1 bg-white " >
              {bookCover.name}
            </p>
          ) : (
            <label className="absolute w-full left-0 top-0 font-r text-gray-400 px-3 py-2 bg-white rounded-md ">
              Book Cover
            </label>
          )}
          <input
            className="w-full px-3  py-1 opacity-0 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white "
            type="file"
            id="bookCover"
            name="bookCover"
            accept=".jpg,.jpeg,.png"
            onChange={(event) => {
              loadfile(event);
              setBookCover(event.target.files[0]);
            }}
            placeholder="Book Cover"
          />
        </div>
        {bookCoverError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {bookCoverError}
          </p>
        )}
        {urlError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {urlError}
          </p>
        )}
      </div>
      {bookCover && (
        <div className="mb-6 ml-4">
          <img
            className="max-h-40 w-auto"
            id="bookCoverPreview"
            src={URL.createObjectURL(bookCover)}
            alt="Book Cover Preview"
          />
        </div>
      )}

      <div className="mb-6">
        <select
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          id="bookCondition"
          name="bookCondition"
          value={bookCondition}
          onChange={(e) => {
            setBookCondition(e.target.value);
          }}
        >
          <option disabled value="">
            Book Condition
          </option>
          <option value="Almost new">Almost New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </select>
        {bookConditionError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {bookConditionError}
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
          onChange={(e) => {
            setBookCoverColor(e.target.value);
          }}
        >
          <option disabled value="">
            Color of Book Cover
          </option>
          {/* <option value="gray">Gray</option>
          <option value="stone">Stone</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="amber">Amber</option>
          <option value="yellow">Yellow</option>
          <option value="lime">Lime</option>
          <option value="green">Green</option>
          <option value="emerald">Emerald</option>
          <option value="teal">Teal</option>
          <option value="Cyan">Cyan</option>
          <option value="sky">Sky</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="voilet">Voilet</option>
          <option value="purple">Purple</option>
          <option value="fuchsia">Fuchsia</option>
          <option value="pink">Pink</option>
          <option value="rose">Rose</option> */}

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
        {bookCoverColorError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {bookCoverColorError}
          </p>
        )}
      </div>
      <div className="grid justify-streatch mt-10 font-r tracking-wider">
        <button
          className={`${isLoading ? "bg-purple-400 py-[1px]" : "bg-purple-600 py-3  hover:bg-purple-700"} text-white text-lg rounded-md flex items-center justify-center`}
          onClick={() => {
            setBookNameError("");
            setAuthorNameError("");
            setBookCoverError("");
            setBookConditionError("");
            setBookCoverColorError("");

            if (validateFields()) {
              postDetails();
            }
          }}
          disabled={isLoading}
        >
         {isLoading ? (
              <img
                className="h-12"
                src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
                alt="Loading"
              />
            ) : (
              <div>Add Book</div>
            )} 
          
        </button>
      </div>
    </div>
  );
};

export default BookForm;
