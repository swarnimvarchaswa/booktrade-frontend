import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import Tabs from "../Components/Tabs";
import BookList from "../Components/Books";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setData([]);
    setIsLoading(true);
  };

  useEffect(() => {
    if (activeTab === 1) {
      fetch("https://booktrade-api.onrender.com/allposts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (activeTab === 2) {
      fetch("https://booktrade-api.onrender.com/postsByUserReadingList", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [activeTab]);

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

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <Tabs
        firstButton={"All Books"}
        secondButton={"Your Wishlist"}
        activeTab={activeTab} // Pass the activeTab state as a prop
        onTabChange={handleTabChange} // Pass a callback function to handle tab changes
      />

      {activeTab === 1 && (
        <div className="max-w-md mx-auto">
          <h1 className="font-r font-normal text-2xl text-left text-gray-600 mx-4 mb-0 mt-8">
            Escape the algorithms
          </h1>
        </div>
      )}
      {activeTab === 2 && (
        <div className="max-w-md mx-auto">
          <h1 className="font-r font-normal text-2xl text-left text-gray-600 mx-4 mb-0 mt-8">
            Complete your bookshelf
          </h1>
        </div>
      )}
      {activeTab === 1 && (
        <>
          {isLoading ? (
            <img
              className="max-w-md w-full mx-auto"
              src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
              alt="Loading"
            />
          ) : (
            <BookList data={data} loggedInUserId={loggedInUserId} />
          )}
        </>
      )}
      {activeTab === 2 && (
        <>
          {isLoading ? (
            <img
              className="max-w-md w-full mx-auto"
              src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
              alt="Loading"
            />
          ) : (
            <BookList data={data} loggedInUserId={loggedInUserId} />
          )}
        </>
      )}
      <div
        className={`max-w-md mx-auto px-2 ${isLoading ? "fixed bottom-14 left-0 right-0" : ""}`}
      >
        <p className="font-r text-sm mt-6 text-slate-400">© 2023 BookTrade</p>
        <p className="font-r text-sm mb-4 text-gray-400">
          Designed & Developed by{" "}
          <Link
            to="https://www.linkedin.com/in/swarnim-varchaswa-59a086228/"
            target="_blank"
            className="text-purple-400 font-normal"
          >
            Swarnim Varchaswa
          </Link>
        </p>
      </div>
      <BottomNavbar />
      <br />
      <br />
      <br />
    </div>
  );
}
