import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../Features/Icons/HomeIcon";
import MessageIcon from "../Features/Icons/MessageIcon";
import SearchIcon from "../Features/Icons/SearchIcon";
import NotificationIcon from "../Features/Icons/NotificationIcon";
import ProfileIcon from "../Features/Icons/ProfileIcon";
import SettingIcon from "../Features/Icons/SettingIcon";

function BottomNavBar() {
  const location = useLocation();

  return (
    <div>
      <div className="sr-only lg:not-sr-only">
        <nav className="fixed left-0 mt-16 top-0 px-4 py-4 h-full w-1/5 bg-white border-r-[1px] ">
          <div className="flex flex-col ">
            <Link
              to="/"
              exact="true"
              className={`px-4 py-4 gap-4 flex flex-row item-center hover:text-purple-500 text-gray-700 font-r tracking-wider ${
                location.pathname === "/" ? "text-purple-500" : "fill-none" //fill-purple-400
              }`}
            >
              <HomeIcon />
              <p>Books</p>
            </Link>
            <Link
              to="/message"
              className={`px-4 py-4 gap-4 flex flex-row items-center hover:text-purple-500  text-gray-700 font-r tracking-wider ${
                location.pathname === "/message" ? "text-purple-500" : ""
              }`}
            >
              <MessageIcon />
              <p>Messsage</p>
            </Link>
            <Link
            to="/search"
            className={`px-4 py-4 gap-4 flex flex-row items-center hover:text-purple-500 text-gray-700 font-r tracking-wider ${
              location.pathname === "/search" ? "text-purple-500 " : ""
            }`}
          >
            <SearchIcon />
            <p>Search</p>
          </Link>

          <Link
            to="/notification"
            className={`px-4 py-4 gap-4 flex flex-row items-center hover:text-purple-500 text-gray-700 font-r tracking-wider ${
              location.pathname === "/notification" ? "text-purple-500 " : ""
            }`}
          >
            <NotificationIcon />
            <p>Notification</p>
          </Link>
          <Link
            to="/profile"
            className={`px-4 py-4 gap-4 flex flex-row items-center hover:text-purple-500 text-gray-700 font-r tracking-wider ${
              location.pathname === "/profile" ? "text-purple-500 " : ""
            }`}
          >
            <ProfileIcon />
            <p>Profile</p>
          </Link>
          <Link
          to="/setting"
          className={`px-4 py-4 gap-4 flex flex-row items-center hover:text-purple-500 text-gray-700 font-r tracking-wider ${
            location.pathname === "/setting" ? "text-purple-500 " : ""
          }`}
          >
          <SettingIcon />
          <p>Setting</p>
          </Link>
          </div>
        </nav>
      </div>
      {/* lg:sr-only */}
      <nav className="fixed bottom-0 left-0 w-full bg-white py-4 border-t-[1px] lg:sr-only">
        <div className="flex justify-around">
          <Link
            to="/"
            exact="true"
            className={`flex flex-col item-center text-gray-700 ${
              location.pathname === "/" ? "text-purple-500" : "fill-none" //fill-purple-400
            }`}
          >
            <HomeIcon />
          </Link>

          <Link
            to="/message"
            className={`flex flex-col items-center text-gray-700 ${
              location.pathname === "/message" ? "text-purple-500" : ""
            }`}
          >
            <MessageIcon />
          </Link>
          <Link
            to="/search"
            className={`flex flex-col items-center text-gray-700 ${
              location.pathname === "/search" ? "text-purple-500 " : ""
            }`}
          >
            <SearchIcon />
          </Link>

          <Link
            to="/notification"
            className={`flex flex-col items-center text-gray-700 ${
              location.pathname === "/notification" ? "text-purple-500 " : ""
            }`}
          >
            <NotificationIcon />
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center text-gray-700 ${
              location.pathname === "/profile" ? "text-purple-500 " : ""
            }`}
          >
            <ProfileIcon />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BottomNavBar;
