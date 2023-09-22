import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Notification from "../Components/Notification"
import BottomNavbar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";


function NotificationPage() {
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
        <Notification />
        <BottomNavbar />
        <br />
        <br />
        <br />
      </div>
    );
  }

  export default NotificationPage;