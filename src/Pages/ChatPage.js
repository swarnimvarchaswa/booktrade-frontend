import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Message from "../Components/NameSearch";
import BottomNavbar from "../Components/BottomNavbar";
import { useNavigate } from "react-router-dom";
import ChatBox from "../Components/ChatBox";

export default function ChatPage({ login }) {
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
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <div className="w-[20vw] hidden lg:block">
          <BottomNavbar />
        </div>
        <div className="w-full">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
