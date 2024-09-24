import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SelectBook from "../Components/SelectBook";
import BottomNavbar from "../Components/BottomNavbar";
import { useNavigate, useParams } from "react-router-dom";

export default function ChoosePage() {
  const { userId, NotificationId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch(`https://booktrade-backend.vercel.app/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { posts } = data;

        setPosts(posts);
        // Now you can use user, posts, and readingList data in your frontend code
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const makeBorrowRequest = async () => {
    if (!NotificationId) {
      console.error("NotificationId is not defined in the route");
      return;
    }
    // setSelectedBook(book);
    try {
      const response = await fetch("https://booktrade-backend.vercel.app/notification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          notificationId: NotificationId, // Assuming you have NotificationId in your component's state
          newStatus: "accept", // Set the new status as needed
          newRequest: "borrow" // Set the new respondBookId to the book's ID
        }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Notification updated successfully");
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
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <div className="max-w-md mx-auto px-4">
        <div>
          <h1
            className="font-r font-normal text-2xl text-left text-gray-600 mx-4 mb-0 mt-8"
          >
            Choose a book
          </h1>
        </div>
        <div className="grid justify-items-stretch max-w-md mx-auto px-4 my-6">
          <button className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-lg "
          onClick={() => {
            //   navigate(`/notification`)
            makeBorrowRequest();
          }}
          >
            Give your book as borrow
          </button>
        </div>
        <SelectBook data={posts} loggedInUserId={loggedInUserId} />
      </div>
      <BottomNavbar />
      <br />
      <br />
      <br />
    </div>
  );
}
