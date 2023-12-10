// import React, { createContext, useContext, useState, useEffect } from "react";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [lasttoken, setLasttoken] = useState(null);
//   const [socketReady, setSocketReady] = useState(false);
//   const [isNewMessage, setIsNewMessage] = useState(false);

//   useEffect(() => {
//     const fetchDataIfNeeded = () => {
//       if (lasttoken !== localStorage.getItem("jwt")) {
//         fetchData();
//         setLasttoken(localStorage.getItem("jwt"));
//       }
//     };

//     // Initial call
//     fetchDataIfNeeded();

//     // Set up interval to check for token changes every 10 seconds
//     const intervalId = setInterval(fetchDataIfNeeded, 10000);

//     // Cleanup interval on component unmount
//     return () => {
//       clearInterval(intervalId);

//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, [lasttoken, socket]); // Include lasttoken in the dependency array

//   const fetchData = async () => {
//     try {
//       const fetchUser = async () => {
//         const response = await fetch(
//           "https://booktrade-api.onrender.com/loginuser",
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("jwt"),
//             },
//           }
//         );
//         const userId = await response.text();
//         return userId;
//       };

//       const newUserId = await fetchUser();

//       // Check if the token has changed
//       if (localStorage.getItem("jwt")) {
//         // Disconnect existing socket
//         if (socket) {
//           socket.disconnect();
//         }

//         // Set up a new socket connection
//         const ENDPOINT = "http://localhost:5000";
//         // const ENDPOINT = "https://booktrade-api.onrender.com";
//         const newSocket = io(ENDPOINT);

//         // Set up socket authentication
//         newSocket.auth = {
//           token: newUserId.toString(),
//         };
//         newSocket.connect();

//         // Set the new socket and token in state
//         setSocket(newSocket);
//         setSocketReady(true); // Set the socket as ready
//       } else {
//         setSocketReady(false); // Set the socket as not ready
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   if (localStorage.getItem("jwt")) {
//     if (!socketReady) {
//       // Return loading or placeholder component if the socket is not available
//       return (
//         <div className="max-w-md mx-auto px-12 h-screen container flex flex-col">
//           <div className="my-auto">
//             {/* <Navbar /> */}
//             <p className="text-gray-800 text-6xl pb-8 font-r font-normal text-center">
//               <span className="text-purple-700">book</span>trade
//             </p>
//             {/* <p className="font-t text-gray-500 tracking-wide text-[21px]">Unlock the Magic of Reading</p>  */}
//             <img
//               className="max-w-md w-2/3 mx-auto"
//               src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
//               alt="Loading"
//             />
//           </div>
//         </div>
//       );
//     }
//   }

//   return (
//     <SocketContext.Provider value={{ socket, setIsNewMessage, isNewMessage }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;

// import React, { createContext, useContext, useState, useEffect } from "react";
// import io from "socket.io-client";
// // import { useLocation, useParams } from "react-router-dom";

// const SocketContext = createContext();

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [lasttoken, setLasttoken] = useState(null);
//   const [socketReady, setSocketReady] = useState(false);
//   const [isNewMessage, setIsNewMessage] = useState(false);

//   // const location = useLocation();
//   // console.log(location);

//   const maxRetries = 5;
//   let retries = 0;

//   useEffect(() => {
//     const fetchDataIfNeeded = () => {
//       if (lasttoken !== localStorage.getItem("jwt")) {
//         fetchData();
//         setLasttoken(localStorage.getItem("jwt"));
//       }
//     };

//     // Initial call
//     fetchDataIfNeeded();

//     // Set up interval to check for token changes every 10 seconds
//     const intervalId = setInterval(fetchDataIfNeeded, 10000);

//     // Cleanup interval on component unmount
//     return () => {
//       clearInterval(intervalId);

//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, [lasttoken, socket]); // Include lasttoken in the dependency array

//   // useEffect(() => {
//   //   if (socket) {
//   //     fetch("https://booktrade-api.onrender.com/loginuser", {
//   //       headers: {
//   //         Authorization: "Bearer " + localStorage.getItem("jwt"),
//   //       },
//   //     })
//   //       .then((res) => res.text())
//   //       .then((userId) => {
//   //         setLoggedInUserId(userId);
//   //       })
//   //       .catch((err) => console.log(err));
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (socket) {
//       // console.log("Setting up socket event listener");
//       socket.on("new notification", (newMessageReceived) => {
//         fetch("https://booktrade-api.onrender.com/loginuser", {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("jwt"),
//           },
//         })
//           .then((res) => res.text())
//           .then((userId) => {
//             if (
//               userId === newMessageReceived.chat.users[0] ||
//               userId === newMessageReceived.chat.users[1]
//             ) {
//               setIsNewMessage(true);
//               // alert(newMessageReceived.content)
//               // const messageContent = newMessageReceived.content;

//               // if(Notification.permission === "granted") {
//               //   const notification = new Notification(`Sent a message`, {
//               //     body: messageContent
//               //   })
//               //   setTimeout(() => {
//               //     notification.close();
//               //   }, 5000);
//               // }
//             }
//           })
//           .catch((err) => console.log(err));
//       });
//       return () => {
//         socket.off("new notification");
//       };
//     } else {
//       // console.log("refresh")
//     }
//   }, [socket]);

//   const fetchData = async () => {
//     try {
//       const fetchUser = async () => {
//         const response = await fetch(
//           "https://booktrade-api.onrender.com/loginuser",
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("jwt"),
//             },
//           }
//         );
//         const userId = await response.text();
//         return userId;
//       };

//       const newUserId = await fetchUser();

//       // Check if the token has changed
//       if (localStorage.getItem("jwt")) {
//         // Disconnect existing socket
//         if (socket) {
//           socket.disconnect();
//         }

//         // Set up a new socket connection
//         const ENDPOINT = "http://localhost:5000";
//         // const ENDPOINT = "https://booktrade-api.onrender.com";

//         const connectSocket = () => {
//           const newSocket = io(ENDPOINT);

//           // Set up socket authentication
//           newSocket.auth = {
//             token: newUserId.toString(),
//           };
//           newSocket.connect();

//           // Set the new socket and token in state
//           setSocket(newSocket);
//           setSocketReady(true); // Set the socket as ready
//         };

//         const attemptSocketConnection = () => {
//           if (retries < maxRetries) {
//             try {
//               connectSocket();
//             } catch (error) {
//               console.error(
//                 `Error connecting to socket (Retry ${retries + 1}):`,
//                 error
//               );
//               retries += 1;
//               setTimeout(attemptSocketConnection, 1000);
//             }
//           } else {
//             console.error("max connection retries reached. Give up");
//           }
//         };
//         attemptSocketConnection();
//       } else {
//         setSocketReady(false); // Set the socket as not ready
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   if (localStorage.getItem("jwt")) {
//     if (!socketReady) {
//       // Return loading or placeholder component if the socket is not available
//       return (
//         <div className="max-w-md mx-auto px-12 h-screen container flex flex-col">
//           <div className="my-auto">
//             {/* <Navbar /> */}
//             <p className="text-gray-800 text-6xl pb-8 font-r font-normal text-center">
//               <span className="text-purple-700">book</span>trade
//             </p>
//             {/* <p className="font-t text-gray-500 tracking-wide text-[21px]">Unlock the Magic of Reading</p>  */}
//             <img
//               className="max-w-md w-2/3 mx-auto"
//               src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
//               alt="Loading"
//             />
//           </div>
//         </div>
//       );
//     }
//   }

//   return (
//     <SocketContext.Provider value={{ socket, setIsNewMessage, isNewMessage }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;

import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
// import { useLocation, useParams } from "react-router-dom";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [lasttoken, setLasttoken] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const [isNewMessage, setIsNewMessage] = useState(false);

  // const location = useLocation();
  // console.log(location);

  const maxRetries = 30;
  let retries = 0;

  useEffect(() => {
    const fetchDataIfNeeded = () => {
      if (lasttoken !== localStorage.getItem("jwt")) {
        fetchData();
        setLasttoken(localStorage.getItem("jwt"));
      }
    };

    // Initial call
    fetchDataIfNeeded();

    // Set up interval to check for token changes every 10 seconds
    const intervalId = setInterval(fetchDataIfNeeded, 3000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);

      if (socket) {
        socket.disconnect();
      }
    };
  }, [lasttoken, socket]); // Include lasttoken in the dependency array

  // useEffect(() => {
  //   if (socket) {
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
  //   }
  // }, []);

  useEffect(() => {
    if (socket) {
      // console.log("Setting up socket event listener");
      socket.on("new notification", (newMessageReceived) => {
        fetch("https://booktrade-api.onrender.com/loginuser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.text())
          .then((userId) => {
            if (
              userId === newMessageReceived.chat.users[0] ||
              userId === newMessageReceived.chat.users[1]
            ) {
              setIsNewMessage(true);
              // alert(newMessageReceived.content)
              // const messageContent = newMessageReceived.content;

              // if(Notification.permission === "granted") {
              //   const notification = new Notification(`Sent a message`, {
              //     body: messageContent
              //   })
              //   setTimeout(() => {
              //     notification.close();
              //   }, 5000);
              // }


              // Notification.requestPermission().then(perm => {
              //   if (perm === "granted") {
              //     new Notification("Example Notification", {
              //       body: "this is booktrade",
              //     })
              //   }
              // })
            }
          })
          .catch((err) => console.log(err));
      });
      return () => {
        socket.off("new notification");
      };
    } else {
      // console.log("refresh")
    }
  }, [socket]);

  const fetchData = async () => {
    try {
      const fetchUser = async () => {
        const response = await fetch(
          "https://booktrade-api.onrender.com/loginuser",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        const userId = await response.text();
        return userId;
      };

      const newUserId = await fetchUser();

      // Check if the token has changed
      if (localStorage.getItem("jwt")) {
        // Disconnect existing socket
        if (socket) {
          socket.disconnect();
        }

        // Set up a new socket connection
        const ENDPOINT = "http://localhost:5000";
        // const ENDPOINT = "https://booktrade-api.onrender.com";

        const connectSocket = () => {
          const newSocket = io(ENDPOINT);

          // Set up socket authentication
          newSocket.auth = {
            token: newUserId.toString(),
          };
          newSocket.connect();

          // Set the new socket and token in state
          setSocket(newSocket);
          setSocketReady(true); // Set the socket as ready
        };

        const attemptSocketConnection = () => {
          if (retries < maxRetries) {
            try {
              connectSocket();
            } catch (error) {
              console.error(
                `Error connecting to socket (Retry ${retries + 1}):`,
                error
              );
              retries += 1;
              setTimeout(attemptSocketConnection, 1000);
            }
          } else {
            console.error("max connection retries reached. Give up");
          }
        };
        attemptSocketConnection();
      } else {
        setSocketReady(false); // Set the socket as not ready
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (localStorage.getItem("jwt")) {
    if (!socketReady) {
      // Return loading or placeholder component if the socket is not available
      return (
        <div className="max-w-md mx-auto px-12 h-screen container flex flex-col">
          <div className="my-auto">
            {/* <Navbar /> */}
            <p className="text-gray-800 text-6xl pb-8 font-r font-normal text-center">
              <span className="text-purple-700">book</span>trade
            </p>
            {/* <p className="font-t text-gray-500 tracking-wide text-[21px]">Unlock the Magic of Reading</p>  */}
            <img
              className="max-w-md w-2/3 mx-auto"
              src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
              alt="Loading"
            />
          </div>
        </div>
      );
    }
  }

  return (
    <SocketContext.Provider value={{ socket, setIsNewMessage, isNewMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
