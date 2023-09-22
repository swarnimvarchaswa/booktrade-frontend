import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";

export default function UpdateProfilePic() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // Added state for preview

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage)); // Preview the selected image
    }
  };

  // const postDetails = async () => {
  //   try {
  //     // Posting image to Cloudinary
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "BookCover");
  //     data.append("cloud_name", "booktrade");
  //     const cloudinaryResponse = await fetch(
  //       "https://api.cloudinary.com/v1/booktrade/image/upload",
  //       {
  //         method: "post",
  //         body: data,
  //       }
  //     );

  //     if (!cloudinaryResponse.ok) {
  //       throw new Error("Upload to Cloudinary failed");
  //     }

  //     const cloudinaryData = await cloudinaryResponse.json();
  //     setUrl(cloudinaryData.url);

  //     // Call PostPic function after setting the URL
  //     PostPic(cloudinaryData.url);
  //   } catch (error) {
  //     console.error("Error uploading image to Cloudinary:", error);
  //     // Handle the error here
  //   }
  // };

    const postDetails = async () => {
    try {
      // Posting image to Cloudinary
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "BookCover");
      data.append("cloud_name", "booktrade");
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/booktrade/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Upload to Cloudinary failed");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      setUrl(cloudinaryData.url);

      // Call PostPic function after setting the URL
      PostPic(cloudinaryData.url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      // Handle the error here
    }
  };

  // const postDetails = () => {
  //   // Posting image to Cloudinary
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "BookCover");
  //   data.append("cloud_name", "booktrade");
  //   fetch("https://api.cloudinary.com/v1_1/booktrade/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUrl(data.url))
  //     .catch((err) => console.log(err));
  // };

  const PostPic = (imageUrl) => {
    try {
      fetch("https://booktrade-api.onrender.com/uploadProfilePic", {
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
          // console.log("Profile picture updated successfully:", data);
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

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
        <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mb-8 mt-4 text-left">
          Update Profile Picture
        </h2>
        <p className="font-r tracking-wide pt-5 pb-4 text-left">Choose a Square Image to Upload</p>
        <div className="mb-6 font-r tracking-wider">
          <input
            className="w-full px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white"
            type="file"
            id="bookCover"
            name="bookCover"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange} // Changed the onChange handler
            placeholder="Book Cover"
          />
        </div>
        {previewImage && (
          <div className="mb-6 ml-4">
            <img
              className="max-h-40 w-auto"
              src={previewImage}
              alt="Selected Image Preview"
            />
          </div>
        )}
        <div className="grid justify-streatch mt-4 font-r tracking-wider">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-2 px-4 rounded-md"
            onClick={() => {
              // Call postDetails here to upload the image
              postDetails();
            }}
          >
            Upload
          </button>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}
