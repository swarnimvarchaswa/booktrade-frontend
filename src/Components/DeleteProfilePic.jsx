import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";

export default function UpdateProfilePic() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // Added state for preview

  const PostPic = (imageUrl) => {
    try {
      fetch("https://booktrade-backend.vercel.app//uploadProfilePic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: imageUrl, // Use the imageUrl obtained from Cloudinary
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Update profile picture failed");
          }
          return res.json();
        })
        .then((data) => {
          //   console.log("Profile picture updated successfully:", data);
          // You can add further handling or update UI as needed here
          navigate("/profile");
        })
        .catch((err) => {
          console.error("Error updating profile picture:", err);
        });
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const removeProfilePicture = () => {
    PostPic(
      "https://res.cloudinary.com/booktrade/image/upload/v1694354727/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532_yzne6o.jpg"
    );
  };

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />

      <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
        <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mb-8 mt-4 text-left">
          Delete Profile Picture
        </h2>
        <div className="grid justify-items-stretch pt-4 mt-10">
          <button
            className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-red-50 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-500 hover:text-red-600 text-lg"
            onClick={removeProfilePicture} // Call removeProfilePicture when "Remove Profile Picture" is clicked
          >
            Remove Profile Picture
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}
