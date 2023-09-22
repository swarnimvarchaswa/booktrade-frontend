import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePic({ changeProfile }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleClick = () => { // Use an arrow function or function expression
    navigate("/uploadprofilepic");
  };
  const deleteClick = () => {
    navigate("/deleteprofilepic")
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40 z-50"
      onClick={changeProfile}
    >
      <div className="relative z-10 w-72  py-2 text-center bg-white rounded-xl">
        <div className="py-5 font-medium font-r tracking-wide">
          <p>Change Profile Photo</p>
        </div>
        <hr className="" />
        <div className="grid justify-stretch">
          <button
            className="logOutBtn py-3 font-medium font-r tracking-wider text-purple-500"
            onClick={handleClick}
          >
            Upload Photo
          </button>
        </div>
        <hr className="" />
        <div className="grid justify-stretch">
          <button className="logOutBtn py-3 font-medium font-r tracking-wider text-red-500"
          onClick={deleteClick}
          >
            Remove Current Photo
          </button>
        </div>
        <hr className="" />
        <div className="grid justify-stretch">
          <button
            className="cancelbtn py-3 font-r tracking-wider"
            onClick={changeProfile}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
