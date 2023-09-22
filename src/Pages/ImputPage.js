import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import AddBookData from "../Components/AddBook";
import BottomNavBar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";


function AddBook() {
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("./login");
      }
    }, []);
  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <AddBookData />
      <BottomNavBar />
      <br />
      <br />
      <br />
    </div>
  );
}

export default AddBook;
