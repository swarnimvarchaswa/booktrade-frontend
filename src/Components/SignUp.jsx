import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeNameError, setCollegeNameError] = useState("");
  const [collegeDegree, setCollegeDegree] = useState("");
  const [collegeDegreeError, setCollegeDegreeError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [collegeNameSuggestions, setCollegeNameSuggestions] = useState([]);
  const [collegeNameInput, setCollegeNameInput] = useState("");

  //toast function
  // const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^.{6,}$/;

  useEffect(() => {
    if (collegeNameInput.length > 2) {
      fetchCollegeNameSuggestions(collegeNameInput);
    }
  }, [collegeNameInput]);

  const fetchCollegeNameSuggestions = (input) => {
    fetch(`https://booktrade-api.onrender.com/colleges?query=${input}`)
      .then((response) => response.json())
      .then((data) => {
        setCollegeNameSuggestions(data.collegeNames);
      })
      .catch((error) => {
        console.error("Error fetching college name suggestions:", error);
      });
  };

  const handleCollegeNameInputChange = (e) => {
    const inputValue = e.target.value;
    setCollegeNameInput(inputValue);
    setCollegeName(inputValue);
  };

  const postData = () => {
    setPasswordError("");
    setNameError("");
    setEmailError("");
    setUserError("");
    setCollegeNameError("");
    setYearError("");
    setCollegeDegreeError("");

    //checking email
    if (!emailRegex.test(email)) {
      // notifyA("Invalid email");
      setEmailError("Enter valid email");
      return;
    } else if (!passwordRegex.test(password)) {
      // notifyA("Password must contain at least 6 characters");s
      setPasswordError("Password must contain at least 6 characters");
      return;
    }

    //sending data to server
    fetch("https://booktrade-api.onrender.com/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        collegeName: collegeName,
        collegeDegree: collegeDegree,
        year: year,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          if (data.error === "nameError") {
            setNameError("Enter your name");
          } else if (data.error === "userError") {
            setUserError("User already exist with that email");
          } else if (data.error === "collegeNameError") {
            setCollegeNameError("Enter your college name");
          } else if (data.error === "collegeDegreeError") {
            setCollegeDegreeError("Enter your college Degree");
          } else if (data.error === "yearError") {
            setYearError("Enter your current year");
          }
          // notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/login");
        }
      });
  };

  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
      <h1 className="text-gray-800 text-5xl font-r font-normal py-10 text-center">
        <span className="text-purple-700">book</span>trade
      </h1>
      <div className="mb-6 font-r tracking-wider">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Full Name"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {/* Name error */}
        {nameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {nameError}
          </p>
        )}
      </div>
      <div className="mb-6 font-r tracking-wider">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {/* Email error */}
        {emailError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {emailError}
          </p>
        )}
        {/* User already exist */}
        {userError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {userError}
          </p>
        )}
      </div>
  
      <div className="mb-6 font-r tracking-wider">
        <input
          type="text"
          id="college_Name"
          value={collegeNameInput}
          onChange={handleCollegeNameInputChange}
          placeholder="Full College Name"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {collegeNameSuggestions.length > 0 && (
          <div className="suggestion-list">
            {collegeNameSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => {
                  setCollegeName(suggestion);
                  setCollegeNameInput(suggestion);
                  setCollegeNameSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        {collegeNameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {collegeNameError}
          </p>
        )}
      </div>

      <div className="mb-6 font-r tracking-wider">
        <select
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          id="collegeDegree"
          name="collegeDegree"
          value={collegeDegree}
          onChange={(e) => {
            setCollegeDegree(e.target.value);
          }}
        >
          <option disabled value="">
            Select your Degree type
          </option>
          <option value="Associate degree">Associate degree</option>
          <option value="Bachelor's degree">Bachelor's degree</option>
          <option value="Master's degree">Master's degree</option>
          <option value="Doctoral degree">Doctoral degree</option>
        </select>
        {/* Year Error */}
        {collegeDegreeError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {collegeDegreeError}
          </p>
        )}
      </div>

      <div className="mb-6 font-r tracking-wider">
        <select
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          id="year"
          name="year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        >
          <option disabled value="">
            Select your year
          </option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
          <option value="5">5th Year</option>
          <option value="6">6th Year</option>
          <option value="7">7th Year</option>
        </select>
        {/* Year Error */}
        {yearError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {yearError}
          </p>
        )}
      </div>
      <div className="mb-6 font-r tracking-wider">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {/* password error */}
        {passwordError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {passwordError}
          </p>
        )}
      </div>
      <div className="grid justify-stretch mt-10 font-r tracking-wider">
        <button
          className="bg-purple-600 text-white py-3 px-4 rounded hover:bg-purple-700"
          onClick={() => {
            postData();
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="mt-10 font-r tracking-wide">
        <p className="text-center text-gray-600">
          Back to{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

