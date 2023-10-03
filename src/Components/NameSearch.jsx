import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import io from "socket.io-client";
import { useSocket } from "../context/socketContext";

// const socket = io("http://localhost:5000");

function People() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const {socket, setIsNewMessage, isNewMessage} = useSocket();
  const {socket, setIsNewMessage, isNewMessage} = useSocket();

  useEffect(() => {
    // Make a fetch request to retrieve chat data
    fetch("https://booktrade-api.onrender.com/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChats(data); // Set the retrieved chat data to the state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures the fetch request runs once on component mount


  useEffect(() => {
    // Listen for online status updates
    socket.on("getOnlineUser", (data) => {
      // Update the online status of the user in the state
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.users[0]._id === data.user_id) {
            return {
              ...chat,
              users: [
                {
                  ...chat.users[0],
                  isOnline: true,
                },
              ],
            };
          }
          return chat;
        })
      );
    });

    // Listen for offline status updates
    socket.on("getOfflineUser", (data) => {
      // Update the offline status of the user in the state
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.users[0]._id === data.user_id) {
            return {
              ...chat,
              users: [
                {
                  ...chat.users[0],
                  isOnline: false,
                },
              ],
            };
          }
          return chat;
        })
      );
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("getOnlineUser");
      socket.off("getOfflineUser");
    };
  }, []); // Empty dependency array ensures the effect runs once on component mount



  return (
    <div className="max-w-md mx-auto px-4 pt-4">
      {isLoading ? (
        <img
          className="w-full"
          src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
          alt="Loading"
        />
      ) : (
        <>
          {chats.length === 0 && (
            <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
              No New Messages
            </div>
          )}
          {Array.isArray(chats) &&
            chats.map((chat) => (
              <div key={chat._id}>
                <div className="flex flex-row border-0 rounded-lg py-1 my-2 hover:bg-purple-100 focus:bg-purple-100">
                  <div className="basis-3/10 flex justify-center relative z-0 whitespace-nowrap flex-shrink-0">
                    <Link className=" mx-2 my-1" to={`/message/${chat._id}`}>
                      <img
                        className="h-[50px] w-[50px] rounded-full"
                        src={chat.users[0].profilePic} // Use the profile pic of the first user
                        alt={chat.users[0].name} // Use the name of the first user
                      />
                      {chat.users[0].isOnline && (
                        <div className="bg-green-500 w-4 h-4 absolute rounded-full bottom-[4px] right-[8px] border-solid border-2 border-white"></div>
                      )}
                    </Link>
                  </div>
                  <div className="basis-5/10 content place-self-center pr-2">
                    <div className="grid grid-row text-left text-base mx-2">
                      <Link to={`/message/${chat._id}`}>
                        <h2 className="pe-1 font-r tracking-wide line-clamp-1 text-xl text-purple-500">
                          {chat.users[0].name}{" "}
                          {/* Use the name of the first user */}
                        </h2>
                        <p className="font-r tracking-wide font-normal text-sm line-clamp-1 text-gray-400">
                          {chat.latestMessage}
                        </p>
                      </Link>
                    </div>
                  </div>
                  {/* <div className="basis-1/10 content place-self-center pr-2 mr-0 ml-auto mt-0">
                    <div className="grid grid-row">
                      <Link to={`/message/${chat._id}`}>
                        <div className="text-[11px]  bg-green-500 w-5 h-5 rounded-full flex items-center text-white mb-[8px] mt-[4px]">
                          <p className="font-r m-auto">11</p>
                        </div>
                        <p className="font-r tracking-wide font-normal text-xs line-clamp-1 text-green-400">
                          4:57
                        </p>
                      </Link>
                    </div>
                  </div> */}
                </div>
                <hr />
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default People;
