import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../Features/Icons/HomeIcon";
import MessageIcon from "../Features/Icons/MessageIcon";
import SearchIcon from "../Features/Icons/SearchIcon";
import NotificationIcon from "../Features/Icons/NotificationIcon";
import ProfileIcon from "../Features/Icons/ProfileIcon";
import SettingIcon from "../Features/Icons/SettingIcon";
import { useSocket } from "../context/socketContext";

function BottomNavBar() {
  const [notifications, setNotifications] = useState([]);
  const [checkTime, setCheckTime] = useState();
  const location = useLocation();
  // const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [showNotificationHR, setShowNotificationHR] = useState(false); // Control the visibility of <hr> tag
  const { socket, setIsNewMessage, isNewMessage } = useSocket();

  // useEffect(() => {
  //   fetch("https://booktrade-api.onrender.com/loginuser", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.text())
  //     .then((userId) => {
  //       setLoggedInUserId(userId);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  if (location.pathname === "/notification") {
    handleNotificationClick();
  }

  function handleNotificationClick() {
    // Add logic to handle the notification click
    // For example, you can make a fetch request to your server to update the notificationCheck field
    fetch("https://booktrade-api.onrender.com/updateNotificationCheck", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.message);
        // Set the notificationClicked state to true to indicate that the notification was clicked
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
  }

  useEffect(() => {
    // Wrap the fetch request in a try-catch block
    try {
      // Use an async function to fetch the notificationCheck value
      const fetchNotificationCheck = async () => {
        const response = await fetch(
          "https://booktrade-api.onrender.com/getNotificationCheck", // Assuming this is the correct route
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
              // You may need to set other headers if required by your server
            },
          }
        );

        if (response.ok) {
          // Parse the response JSON
          const data = await response.json();

          // Extract the notificationCheck value from the response
          const { notificationCheck } = data;
          setCheckTime(notificationCheck); // Set checkTime to the actual value

          // Compare notificationCheck with the latest notification time
          if (notifications.length > 0) {
            const latestNotificationTime = new Date(
              notifications[0] // Assuming notifications[0] is the latest time
            );
            const isAfterNotificationCheck =
              latestNotificationTime > new Date(notificationCheck);
            setShowNotificationHR(isAfterNotificationCheck);
          }

          // Use the notificationCheck value as needed
          // console.log("Notification Check:", notificationCheck);
        } else {
          // Handle the case when the request fails
          console.error("Failed to fetch notificationCheck");
        }
      };

      // Call the async fetchNotificationCheck function
      fetchNotificationCheck();
    } catch (err) {
      console.error(err);
    }
  }, [notifications]); // Add notifications as a dependency to trigger the effect when notifications change

  useEffect(() => {
    // Wrap the fetch request in a try-catch block
    try {
      // Use an async function to fetch data and set state
      const fetchData = async () => {
        const response = await fetch(
          "https://booktrade-api.onrender.com/notification",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );

        if (response.ok) {
          // Parse the response JSON
          const data = await response.json();

          // Extract updatedAt values from the notifications array
          const updatedAtValues = data.notifications.map(
            (notification) => notification.updatedAt
          );

          setNotifications(updatedAtValues);
          // console.log("Request data:", updatedAtValues);
        } else {
          // Handle the case when the request fails
          console.error("Failed to fetch notifications");
        }
      };

      // Call the async fetchData function
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

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
              onClick={() => setIsNewMessage(false)}
            >
              <MessageIcon />
              <p className="fixed left-[72px]">Messsage</p>

              {isNewMessage && (
                <hr className="border-solid border-[6px] rounded-full z-50 border-purple-600 w-0 relative bottom-[9px] right-[26px]" />
              )}
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
              onClick={handleNotificationClick}
            >
              <NotificationIcon />
              <p className="fixed left-[72px]">Notification</p>
              {showNotificationHR && (
                <hr className="border-solid border-[6px] rounded-full z-50 border-purple-600 w-0 relative bottom-[9px] right-[27px]" />
              )}
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
            className={`flex flex-col pb-1 items-center text-gray-700 ${
              location.pathname === "/message" ? "text-purple-500" : ""
            }`}
            onClick={() => setIsNewMessage(false)}
          >
            <MessageIcon />
            {isNewMessage ? (
              <hr className="border-solid border-[3px] rounded-full z-50 border-purple-600 w-0 relative bottom-[-2px] " />
            ) : (
              <hr className="border-solid border-[3px] rounded-full z-50 opacity-0 border-purple-600 w-0 relative bottom-[-2px] " />
            )}
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
            className={`flex flex-col pb-1 items-center text-gray-700 ${
              location.pathname === "/notification" ? "text-purple-500 " : ""
            }`}
            onClick={handleNotificationClick}
          >
            <NotificationIcon />
            {showNotificationHR ? (
              <hr className="border-solid border-[3px] rounded-full z-50 border-purple-600 w-0 relative bottom-[-2px]" />
            ) : (
              <hr className="border-solid border-[3px] rounded-full z-50 opacity-0 w-0 relative bottom-[-2px]" />
            )}
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
