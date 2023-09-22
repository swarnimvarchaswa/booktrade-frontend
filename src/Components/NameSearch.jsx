import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function People() {
  const [chats, setChats] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, []); // Empty dependency array ensures the fetch request runs once on component mount



  return (
    <div className="max-w-md mx-auto px-4 pt-4">
      {chats.map((chat) => (
        <div key={chat._id}>
          <div className="flex flex-row border-0 rounded-lg py-1 my-2 hover:bg-purple-100 focus:bg-purple-100">
            <div className="basis-1/4 flex justify-center">
              <Link to={`/message/${chat._id}`}>
                <img
                  className="h-[50px] w-[50px] mx-2 my-1 border-solid rounded-full border-2 border-purple-500"
                  src={chat.users[0].profilePic} // Use the profile pic of the first user
                  alt={chat.users[0].name} // Use the name of the first user
                />
              </Link>
            </div>
            <div className="basis-3/4 content place-self-center pr-2">
              <div className="grid grid-row text-left text-base mx-2">
                <Link to={`/message/${chat._id}`}>
                  <h2 className="pe-1 font-r tracking-wide line-clamp-1 text-xl text-purple-500">
                    {chat.users[0].name} {/* Use the name of the first user */}
                  </h2>
                  <p className="font-r tracking-wide font-normal text-sm line-clamp-1 text-gray-400">{chat.latestMessage}</p>
                </Link>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default People;

