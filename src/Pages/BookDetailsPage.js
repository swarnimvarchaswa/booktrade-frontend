import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BottomNavBar from "../Components/BottomNavbar";
import BookDetails from "../Components/BookDetails";
import { useNavigate, useParams } from "react-router-dom";
import DeleteBookModal from "../Components/DeleteBookModal";

function BookDetailsPage() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const { bookIdUrl } = useParams();
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isBookDeleted, setIsBookDeleted] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetch(`https://booktrade-api.onrender.com/detail/${bookIdUrl}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSelectedBook(result);
        setIsLoading(false);
        // console.log("Fetched book details:", result);
      })
      .catch((err) => console.log(err));
    // setIsLoading(false);
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
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  const handleDeleteItem = () => {
    // Set the item to delete and open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBook = () => {
    // Send a DELETE request to your API to delete the book by its ID
    fetch(`https://booktrade-api.onrender.com/deleteBook/${bookIdUrl}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "Book deleted successfully") {
          setIsBookDeleted(true);
          navigate("/profile");
          // Set the delete status to true
        } else {
          console.error("Error deleting book:", result.error);
        }
      })
      .catch((err) => console.error("Delete request failed:", err));
  };

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />

      <BottomNavBar />
      {isLoading ? (
        <img
          className="max-w-md w-full mx-auto"
          src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
          alt="Loading"
        />
      ) : (
        <>
          <BookDetails
            selectedBook={selectedBook}
            loggedInUserId={loggedInUserId}
            onDelete={handleDeleteItem}
          />
        </>
      )}
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onDeleteCallback={handleDeleteBook}
      />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default BookDetailsPage;
