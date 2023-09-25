import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Profile from "../Components/Profile";
import Tabs from "../Components/Tabs";
import BookList from "../Components/Books";
import Readinglist from "../Components/Readinglist";
import BottomNavbar from "../Components/BottomNavbar";
import { Link, useNavigate } from "react-router-dom";
import DeleteBookModal from "../Components/DeleteBookListModal";

function HomePage() {
  const navigate = useNavigate();
  const [pic, setPic] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState(
    parseInt(localStorage.getItem("activeTab")) || 1
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://booktrade-api.onrender.com/userdetail", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((userdata) => {
        setUserData(userdata);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  });

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    localStorage.setItem("activeTab", tabIndex); 
    setIsLoading(true)
  };

  useEffect(() => {
    if (activeTab === 1) {
      fetch("https://booktrade-api.onrender.com/myposts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPic(result);
          setIsLoading(false);
        });
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

  useEffect(() => {
    if (activeTab === 2) {
      fetch("https://booktrade-api.onrender.com/readinglist", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        // method: "get",
      })
        .then((res) => res.json())
        .then((result) => {
          setReadingList(result);
          setIsLoading(false)
        });
    }
  }, [activeTab]);

  const handleDeleteReadingListItem = (indexToDelete) => {
    // Set the item to delete and open the delete confirmation modal
    setItemToDelete(indexToDelete);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Make a DELETE request to your server to delete the item
    fetch(
      `https://booktrade-api.onrender.com/readinglist/${readingList.readingList[itemToDelete]._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          // Update the state with the modified reading list
          const updatedReadingList = [...readingList.readingList];
          updatedReadingList.splice(itemToDelete, 1);
          setReadingList({ readingList: updatedReadingList });
        } else {
          console.error(result.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <Profile user={userData} />
      <Tabs
        firstButton={"Your Books"}
        secondButton={"Your Wishlist"}
        activeTab={activeTab} // Pass the activeTab state as a prop
        onTabChange={handleTabChange} // Pass a callback function to handle tab changes
      />
      {activeTab === 1 && (
        <div className="px-4 mt-6 max-w-md mx-auto ">
          <Link to="/addbook" className="grid justify-items-stretch">
            <button className="font-r tracking-wider border-solid  border-2 rounded-lg py-2 text-gray-700 bg-white hover:border-purple-500 text-lg  ">
              Add Book +
            </button>
          </Link>
        </div>
      )}
      {activeTab === 2 && (
        <div className="px-4 mt-6 max-w-md mx-auto ">
          <Link to="/addreadinglist" className="grid justify-items-stretch">
            <button className="font-r tracking-wider border-solid  border-2 rounded-lg py-2 text-gray-700 bg-white hover:border-purple-500 hover: text-lg  ">
              Add Book +
            </button>
          </Link>
        </div>
      )}
      {activeTab === 1 && (
        <>
          {isLoading ? (
            <div className="max-w-md mx-auto">
            <img
              className="w-1/2 mx-auto"
              src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
              alt="Loading"
            />
            </div>
          ) : (
            <BookList data={pic} loggedInUserId={loggedInUserId} />
          )}
        </>
      )}
      {activeTab === 2 && (
        <>
          {isLoading ? (
            <div className="max-w-md mx-auto">
            <img
              className=" w-1/2 mx-auto"
              src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
              alt="Loading"
            /></div>
          ) : (
            <Readinglist
              readinglist={readingList}
              onDeleteItem={handleDeleteReadingListItem}
            />
          )}
        </>
      )}
      <BottomNavbar />
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
