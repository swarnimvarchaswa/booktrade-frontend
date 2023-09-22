import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Message from "../Components/NameSearch";
import BottomNavbar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";

function MessagePage() {
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  return (
    <div>
      <div className="lg:mt-16">
        <Navbar />
        <Message />
        <BottomNavbar />
      </div>
    </div>
  );
}

export default MessagePage;
