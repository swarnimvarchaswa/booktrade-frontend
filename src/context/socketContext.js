// import React, { createContext, useContext, useState, useEffect } from "react";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {

//     }
//   }, []);

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
//       if (newUserId !== token) {
//         // Disconnect existing socket
//         if (socket) {
//           socket.disconnect();
//         }

//         // Set up a new socket connection
//         const ENDPOINT = "http://localhost:5000";
//         const newSocket = io(ENDPOINT);

//         // Set up socket authentication
//         newSocket.auth = {
//           token: newUserId.toString(),
//         };
//         newSocket.connect();

//         // Set the new socket and token in state
//         setSocket(newSocket);
//         setToken(newUserId);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     // Initial fetch when component mounts
//     fetchData();

//     // Set up interval to check for token changes every 10 seconds
//     const intervalId = setInterval(fetchData, 10000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []); // Dependencies array should be empty since we only want to run this once on mount

//   if (!socket) {
//     // Return loading or placeholder component if the socket is not available
//     return <div></div>;
//   }

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// export default SocketProvider;

import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [lasttoken, setLasttoken] = useState(null);
  const [socketReady, setSocketReady] = useState(false);

  // useEffect(() => {
  //   if (lasttoken !== localStorage.getItem("jwt")) {
  //     fetchData()
  //     setLasttoken = localStorage.getItem("jwt")
  //   }
  // }, []);

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
    const intervalId = setInterval(fetchDataIfNeeded, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [lasttoken]); // Include lasttoken in the dependency array

  useEffect(() => {
    fetchData();
  }, []);

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
        // const ENDPOINT = "http://localhost:5000";
        const ENDPOINT = "https://booktrade-api.onrender.com";
        const newSocket = io(ENDPOINT);

        // Set up socket authentication
        newSocket.auth = {
          token: newUserId.toString(),
        };
        newSocket.connect();

        // Set the new socket and token in state
        setSocket(newSocket);
        setSocketReady(true); // Set the socket as ready
      } else {
        setSocketReady(false); // Set the socket as not ready
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // {lasttoken && !socketReady && (
  //   <div> loading </div>
  // )}

  // if (!socketReady) {
  //   // Return loading or placeholder component if the socket is not available
  //   return <div> loading </div>;
  // }

  if (localStorage.getItem("jwt")) {
    if (!socketReady) {
      // Return loading or placeholder component if the socket is not available
      return <div> </div>;
    } else {
    }
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
