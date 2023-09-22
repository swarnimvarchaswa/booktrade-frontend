import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import SetAvailability from "../Components/setAvailability";
import { Link, useNavigate } from "react-router-dom";

export default function AvailabilityPage() {
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
      <SetAvailability />
      <BottomNavbar />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
