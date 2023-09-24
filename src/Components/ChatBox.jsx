import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SendIcon from "../Features/Icons/SendIcon";

import io from "socket.io-client";
const ENDPOINT = "https://booktrade-api.onrender.com";
var socket;

export default function ChatBox() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUserProfilePic, setOtherUserProfilePic] = useState("");
  const [otherUserId, setOtherUserId] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.io connection
    socket = io(ENDPOINT);

    socket.on("connect", () => {
      // console.log("Socket connected");
    });

    // Handle any errors that occur
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Join the chat room with the chatId
    socket.emit("join chat", chatId);

    // Listen for incoming messages
    socket.on("message received", (newMessageReceived) => {
      // console.log("Received message:", newMessageReceived);
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  // Fetch logged-in user id
  useEffect(() => {
    fetch("https://booktrade-api.onrender.com/loginuser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.text())
      .then((userId) => {
        setLoggedInUserId(userId);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch other user's name and profile picture
  useEffect(() => {
    fetch(`https://booktrade-api.onrender.com/chat/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOtherUserName(data.name);
        setOtherUserProfilePic(data.profilePic);
        setOtherUserId(data._id);
      })
      .catch((error) => {
        console.error("Error fetching other user data:", error);
      });
  }, [chatId]);

  // Fetch chat messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://booktrade-api.onrender.com/message/${chatId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages(data.messages);

        socket.emit("join chat", chatId);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, []);

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    const newMessageObj = {
      _id: Math.random().toString(36).substring(7),
      content: newMessage,
      sender: { _id: loggedInUserId },
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessage("");

    // console.log("Other User ID:", otherUserId);

    socket.emit("new message", {
      chat: { _id: chatId, users: [loggedInUserId, otherUserId] },
      sender: { _id: loggedInUserId },
      content: newMessage,
    });

    fetch(`https://booktrade-api.onrender.com/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        chatId: chatId,
        content: newMessage,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  return (
    <div className="lg:w-4/5 w-full fixed right-0 rounded">
      <div
        className="overflow-y-auto pb-10 bg-slate-50 h-[94vh] lg:h-[86vh] custom-scrollbar"
        ref={chatContainerRef}
      >
        <style>
          {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px !important;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1; /* Track color (gray) */
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888; /* Thumb color (gray) */
            border-radius: 3px;
          }
        `}
        </style>
        <div className="fixed w-full">
          <Link
            to={`/user/${otherUserId}`}
            className="flex items-center bg-white"
          >
            <img
              src={otherUserProfilePic}
              alt="User's Image"
              className="w-12 h-12 rounded-full ml-[3vw] mr-2"
            />
            <h3 className="text-left font-r font-normal tracking-wide text-2xl pl-3 py-4 bg-white text-purple-700">
            <span className="line-clamp-1">{otherUserName}</span>
            </h3>
          </Link>
        </div>
        <div className="pl-[3vw] pr-[3vw]">
          <br />
          <br />
          <br />
          <br />
          <p className="font-r text-sm lg:text-base font-normal text-gray-300">
            Messages will disappear on their own in 24 hr.
          </p>
          <br />

          {messages.map((message, index) => (
            <p
              key={`${message._id || message.chat._id}-${index}`}
              className={`font-r text-left text-lg py-2 px-6 my-2 rounded-2xl w-fit ${
                message.sender._id === loggedInUserId
                  ? "ml-auto bg-purple-600 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </p>
          ))}
          <br />
          <br />
        </div>
        <div className="fixed bottom-0 bg-slate-50 py-6 pl-[3vw] pr-[3vw] flex items-center w-full">
          <input
            className="py-3 px-3 w-full lg:w-[74vw] rounded-lg bg-gray-200 outline-none"
            type="text"
            id="newMessage"
            name="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your Message"
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          <button
            className="fixed pr-3 pl-3 right-[3vw] py-1 rounded-lg bg-gray-200 text-purple-600"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// import React, { useRef, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import SendIcon from "../Features/Icons/SendIcon";

// import io from "socket.io-client";
// const ENDPOINT = "https://booktrade-api.onrender.com";
// var socket;

// export default function ChatBox() {
//   const { chatId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [loggedInUserId, setLoggedInUserId] = useState(null);
//   const [otherUserName, setOtherUserName] = useState("");
//   const [otherUserProfilePic, setOtherUserProfilePic] = useState("");
//   const [otherUserId, setOtherUserId] = useState("");
//   const [newMessage, setNewMessage] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]); // Track online users
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     // Initialize Socket.io connection
//     socket = io(ENDPOINT);

//     socket.on("connect", () => {
//       // console.log("Socket connected");
//     });

//     // Handle any errors that occur
//     socket.on("error", (error) => {
//       console.error("Socket error:", error);
//     });

//     // Join the chat room with the chatId
//     socket.emit("join chat", chatId);

//     // Listen for incoming messages
//     socket.on("message received", (newMessageReceived) => {
//       // console.log("Received message:", newMessageReceived);
//       setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
//     });

//     // Listen for online users
//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     // Clean up the socket connection when component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, [chatId]);

//   // Fetch logged-in user id
//   useEffect(() => {
//     fetch("https://booktrade-api.onrender.com/loginuser", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.text())
//       .then((userId) => {
//         setLoggedInUserId(userId);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // Fetch other user's name and profile picture
//   useEffect(() => {
//     fetch(`https://booktrade-api.onrender.com/chat/${chatId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setOtherUserName(data.name);
//         setOtherUserProfilePic(data.profilePic);
//         setOtherUserId(data._id);
//       })
//       .catch((error) => {
//         console.error("Error fetching other user data:", error);
//       });
//   }, [chatId]);

//   // Fetch chat messages
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://booktrade-api.onrender.com/message/${chatId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("jwt"),
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setMessages(data.messages);

//         socket.emit("join chat", chatId);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Scroll to the bottom when new messages arrive
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") {
//       return;
//     }

//     const newMessageObj = {
//       _id: Math.random().toString(36).substring(7),
//       content: newMessage,
//       sender: { _id: loggedInUserId },
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessageObj]);
//     setNewMessage("");

//     // console.log("Other User ID:", otherUserId);

//     socket.emit("new message", {
//       chat: { _id: chatId, users: [loggedInUserId, otherUserId] },
//       sender: { _id: loggedInUserId },
//       content: newMessage,
//     });

//     fetch(`https://booktrade-api.onrender.com/message`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({
//         chatId: chatId,
//         content: newMessage,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//       });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && newMessage.trim() !== "") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="lg:w-4/5 w-full fixed right-0 rounded">
//       <div
//         className="overflow-y-auto pb-10 bg-slate-50 h-[94vh] lg:h-[86vh] custom-scrollbar"
//         ref={chatContainerRef}
//       >
//         <style>
//           {`
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 0px !important;
//           }

//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: #f1f1f1; /* Track color (gray) */
//             border-radius: 3px;
//           }

//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: #888; /* Thumb color (gray) */
//             border-radius: 3px;
//           }
//         `}
//         </style>
//         <div className="fixed w-full flex items-center bg-white">
//           <Link
//             to={`/user/${otherUserId}`}
//             className="flex items-center"
//           >
//             <img
//               src={otherUserProfilePic}
//               alt="User's Image"
//               className="w-12 h-12 rounded-full ml-[3vw] mr-2"
//             />
//             <h3 className="text-left font-r font-normal tracking-wide text-2xl pl-3 py-4 bg-white text-purple-700">
//               {otherUserName}
//             </h3>
//             {onlineUsers.includes(otherUserId) ? (
//               <span className="text-green-500 ml-2">Online</span>
//             ) : (
//               <span className="text-red-500 ml-2">Offline</span>
//             )}
//           </Link>
//         </div>
//         <div className="pl-[3vw] pr-[3vw]">
//           <br />
//           <br />
//           <br />
//           <br />
//           <p className="font-r text-sm lg:text-base font-normal text-gray-300">
//             Messages will disappear in 24 hours
//           </p>
//           <br />

//           {messages.map((message, index) => (
//             <p
//               key={`${message._id || message.chat._id}-${index}`}
//               className={`font-r text-left text-lg py-2 px-6 my-2 rounded-2xl w-fit ${
//                 message.sender._id === loggedInUserId
//                   ? "ml-auto bg-purple-600 text-white"
//                   : "mr-auto bg-gray-200 text-gray-800"
//               }`}
//             >
//               {message.content}
//             </p>
//           ))}
//           <br />
//           <br />
//         </div>
//         <div className="fixed bottom-0 bg-slate-50 py-6 pl-[3vw] pr-[3vw] flex items-center w-full">
//           <input
//             className="py-3 px-3 w-full lg:w-[74vw] rounded-lg bg-gray-200 outline-none"
//             type="text"
//             id="newMessage"
//             name="newMessage"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your Message"
//             onKeyPress={handleKeyPress}
//             autoComplete="off"
//           />
//           <button
//             className="fixed pr-3 pl-3 right-[3vw] py-1 rounded-lg bg-gray-200 text-purple-600"
//             onClick={handleSendMessage}
//           >
//             <SendIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
