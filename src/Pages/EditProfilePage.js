import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import EditProfile from "../Components/EditProfile"
import { useNavigate } from "react-router-dom";

function EditBookPage() {
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
      <EditProfile />
      <BottomNavbar />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default EditBookPage;