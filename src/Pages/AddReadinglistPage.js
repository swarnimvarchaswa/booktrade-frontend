import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import AddReadinglist from "../Components/AddReadinglist";
import BottomNavBar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";


export default function AddReadinglistPage() {
  const navigate = useNavigate();

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="lg:mt-16 lg:py-1">
      <Navbar />
      <AddReadinglist />
      <BottomNavBar />
      <br />
      <br />
      <br />
    </div>
  );
}
