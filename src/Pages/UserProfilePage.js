import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Profile from "../Components/Profile";
import Tabs from "../Components/Tabs";
import BookList from "../Components/Books";
import UserReadingList from "../Components//UserReadingList";
import BottomNavbar from "../Components/BottomNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [userData, setUserData] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  useEffect(() => {
    fetch("https://booktrade-api.onrender.com/loginuser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.text())
      .then((userId) => {
        setLoggedInUserId(userId);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userId === loggedInUserId) {
      navigate("/profile");
    }
  }, [loggedInUserId]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    fetch(`https://booktrade-api.onrender.com/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { user, posts, readingList } = data;

        setReadingList(readingList);
        setPosts(posts);
        setUserData(user);
        // Now you can use user, posts, and readingList data in your frontend code
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

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
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <Profile user={userData} />
      <div className="grid justify-items-stretch max-w-md mx-auto px-4 mt-8">
        <button className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-lg "
         onClick={() => handleSendMessage(userId)} // Use the callback function
        >
          Message
        </button>
      </div>
      <Tabs
        firstButton={" Books"}
        secondButton={" Wishlist"}
        activeTab={activeTab} // Pass the activeTab state as a prop
        onTabChange={handleTabChange} // Pass a callback function to handle tab changes
      />
      {activeTab === 1 && (
        <BookList data={posts} loggedInUserId={loggedInUserId} />
      )}
      {activeTab === 2 && <UserReadingList readinglist={readingList} />}
      <BottomNavbar />

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
