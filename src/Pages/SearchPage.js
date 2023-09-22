import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Tabs from "../Components/Tabs";
import BottomNavbar from "../Components/BottomNavbar";
import BookList from "../Components/Books";
import UserList from "../Components/Users"; // Import the UserList component
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "../Features/Icons/SearchIcon";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search"); // Use a generic 'search' query parameter

  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [activeTab, setActiveTab] = useState(1); // Default to the book search tab

  const [data, setData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, [navigate]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setData([]);
  };

  const handleSearch = () => {
    // Clear data when performing a new search
    setData([]);

    // Make an authenticated request with the token
    const apiUrl = `https://booktrade-api.onrender.com/${
      activeTab === 1
        ? `searchbook?bookName=${encodeURIComponent(searchQuery)}&tab=1`
        : `searchuser?name=${encodeURIComponent(searchQuery)}&tab=2` // Determine the endpoint based on activeTab
    }`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((newData) => {
        // console.log("Received data:", newData);
        setData(newData);
      })
      .catch((error) => {
        console.error(
          `Error fetching ${activeTab === 1 ? "books" : "users"}:`,
          error
        );
      });

    // Update the URL
    const newUrl = `./?search=${encodeURIComponent(
      searchQuery
    )}&tab=${activeTab}`;
    navigate(newUrl);
  };

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="my-8 mx-4 grid grid-cols-6 gap-0"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="px-2 py-2 border col-start-1 col-end-6 border-gray-300 rounded-l-md focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="px-5 py-2 col-start-6 col-end-7 bg-purple-500 text-white rounded-r-md hover:bg-purple-600 focus:outline-none"
          >
            <SearchIcon />
          </button>
        </form>
      </div>
      <Tabs
        firstButton={"Books"}
        secondButton={"People"}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === 1 ? (
        <BookList data={data} loggedInUserId={loggedInUserId} />
      ) : (
        <UserList data={data} loggedInUserId={loggedInUserId} /> // Render UserList for user search
      )}
      <BottomNavbar />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default SearchPage;
