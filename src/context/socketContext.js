import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('https://booktrade-api.onrender.com'); // Replace with your server endpoint

    newSocket.on('updateIsOnline', (updatedOnlineUsers) => {
      setOnlineUsers(updatedOnlineUsers);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
}; 