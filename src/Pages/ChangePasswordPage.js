import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import ChangePassword from "../Components/ChangePassword";
import { useNavigate } from "react-router-dom";

function HomePage() {
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
      <ChangePassword />
      <BottomNavbar />
    </div>
  );
}

export default HomePage;
