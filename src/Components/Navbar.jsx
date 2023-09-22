import React from "react";
import { Link, useLocation } from "react-router-dom";
import SettingIcon from "../Features/Icons/SettingIcon";

function Navbar() {
  const location = useLocation();
  // const loginStatus = () => {
  //   const token = localStorage.getItem("jwt");
  //   if(token){
  //     return
  //   }
  // };
  // loginStatus();
  // max-w-7xl
  return (
    <nav className=" bg-purple-100 md:bg-purple-200 lg:px-4 lg:fixed lg:top-0 lg:left-0 lg:w-full">
      {/* <nav className=" bg-purple-100 md:bg-purple-200 lg:px-4 fixed top-0 left-0 w-full"> */}
      <div className="flex items-center justify-between px-4 py-4 mx-auto ">
        {/* all */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/search" ||
            location.pathname === "/message" ||
            location.pathname === "/notification" ||
            location.pathname === "/setting"
              ? "hidden"
              : ""
          }`}
        >
          <span className="text-purple-700">book</span>trade
          <span className="font-light text-xl"> beta</span>
        </div>
        {/* Messages */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/message" ? "" : "hidden"
          }`}
        >
          Messages
        </div>
        {/* Search */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/search" ? "" : "hidden"
          }`}
        >
          Search
        </div>
        {/* Notification */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/notification" ? "" : "hidden"
          }`}
        >
          Notifications
        </div>
        {/* Setting */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/setting" ? "" : "hidden"
          }`}
        >
          Setting
        </div>
        <div>
          <Link
            to="/setting"
            className={`flex flex-row items-center text-gray-700  lg:sr-only ${
              location.pathname === "/setting" ? "text-purple-500 " : ""
            }
          ${location.pathname === "/profile" ? " " : "hidden"}`}
          >
            <SettingIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
