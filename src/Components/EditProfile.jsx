import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProfile() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
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

  const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    fetch("https://booktrade-backend.vercel.app/userdetail", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.error("Server Error:", data.error);
        } else {
          setName(data.name);
          setEmail(data.email);
          setCollegeName(data.collegeName);
          setCollegeDegree(data.collegeDegree);
          setYear(data.year);
          setProfilePic(data.profilePic);
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        // Handle the error, e.g., show an error message to the user
      });
  }, []);
  

const UpdateProfile = () => {
    const data = {
        name,
        email,
        collegeName,
        collegeDegree,
        year
      };
      fetch("https://booktrade-backend.vercel.app/editprofile", {
        method: "PUT",
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
}


  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
      <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mb-8 mt-4 text-left">
        Update your profile
      </h2>

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
          value={collegeName}
          onChange={(e) => {
            setCollegeName(e.target.value);
          }}
          placeholder="college Name"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {/* college Name Error */}
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
      <div className="grid justify-stretch mt-10 font-r tracking-wider">
        <button
          className="bg-purple-600 text-white py-3 px-4 rounded hover:bg-purple-700"
          onClick={() => {
            UpdateProfile();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
