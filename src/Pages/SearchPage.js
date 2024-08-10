import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Tabs from "../Components/Tabs";
import BottomNavbar from "../Components/BottomNavbar";
import BookList from "../Components/Books";
import UserList from "../Components/Users";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "../Features/Icons/SearchIcon";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search");

  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setData([]);
    // handleSearch()
  };

  const handleSearch = () => {
    setIsLoading(true);
    setData([]);

    if (!searchQuery) {
      setIsLoading(false);
      return;
    }

    const apiUrl = `https://booktrade-backend.vercel.app/${
      activeTab === 1
        ? `searchbook?bookName=${encodeURIComponent(searchQuery)}&tab=1`
        : `searchuser?name=${encodeURIComponent(searchQuery)}&tab=2`
    }`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((newData) => {
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          `Error fetching ${activeTab === 1 ? "books" : "users"}:`,
          error
        );
        setIsLoading(false);
      });

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
      {/* Conditionally render a blank page when there's no search query */}
      {!searchQuery ? (
        <div className="mt-6 text-m tracking-wide text-gray-600 text-lg">
          {activeTab === 1
            ? "Enter Book Name"
            : "Enter User Name"}
        </div>
      ) : activeTab === 1 ? (
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
      ) : (
        <>
          {isLoading ? (
            <img
              className="max-w-md w-full mx-auto"
              src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
              alt="Loading"
            />
          ) : (
            <UserList data={data} loggedInUserId={loggedInUserId} />
          )}
        </>
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
