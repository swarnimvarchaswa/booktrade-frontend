import React, { useEffect } from "react";
import Setting from "../Components/Setting";
import Navbar from "../Components/Navbar";
import BottomNavbar from "../Components/BottomNavbar";
import { Link, useNavigate } from "react-router-dom";



function SettingPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if(!token){
      navigate("../login")
    }
  })

  return (
    <div className="lg:mt-16 lg:py-1">
        <Navbar />
      <Setting />
      <BottomNavbar />
      <div className="max-w-md mx-auto fixed bottom-14 left-0 right-0">
        <p className="font-r text-sm mt-6 text-slate-400">© 2023 BookTrade</p>
        <p className="font-r text-sm mb-4 text-gray-400">
          Designed and Developed by <Link
          to="https://www.linkedin.com/in/swarnim-varchaswa-59a086228/"
          target="_blank"
          className="text-purple-400 font-normal"
        >
          Swarnim Varchaswa
        </Link>
        </p>
      </div>
    </div>
  );
}
export default SettingPage;
