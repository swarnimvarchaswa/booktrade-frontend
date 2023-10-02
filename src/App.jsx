import "./App.css";
import React, { useState } from "react"; // { createContext, , useState }
import HomePage from "./Pages/HomePage";
import MessagePage from "./Pages/MessagePage";
import SearchPage from "./Pages/SearchPage";
import NotificationPage from "./Pages/NotificationPage";
import ProfilePage from "./Pages/ProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import BookDetailsPage from "./Pages/BookDetailsPage";
import ImputPage from "./Pages/ImputPage";
import AddReadinglistPage from "./Pages/AddReadinglistPage";
import SettingPage from "./Pages/SettingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import Modal from "./Components/Modal";
import { LoginContext } from "./context/loginContext";
import EditBookPage from "./Pages/EditBookPage";
import AvailabilityPage from "./Pages/AvailabilityPage";
import EditProfilePage from "./Pages/EditProfilePage";
import UpdateProfilePic from "./Components/UpdateProfilePic";
import DeleteProfilePic from "./Components/DeleteProfilePic";
import ChooseBook from "./Pages/ChooseBook";
import ChatPage from "./Pages/ChatPage";
import IsOnline from "./context/socketContext";
import { SocketProvider } from "./context/socketContext";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <HomePage />
        </div>
      ),
    },
    {
      path: "/message",
      element: (
        <div>
          <MessagePage />
        </div>
      ),
    },
    {
      path: "/search",
      element: (
        <div>
          <SearchPage />
        </div>
      ),
    },
    {
      path: "/notification",
      element: (
        <div>
          <NotificationPage />
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          <ProfilePage />
        </div>
      ),
    },
    {
      path: "/detail/:bookIdUrl",
      element: (
        <div>
          <BookDetailsPage />
        </div>
      ),
    },
    {
      path: "/addbook",
      element: (
        <div>
          <ImputPage />
        </div>
      ),
    },
    {
      path: "/editbook/:bookId",
      element: (
        <div>
          <EditBookPage />
        </div>
      ),
    },
    {
      path: "/addreadinglist",
      element: (
        <div>
          <AddReadinglistPage />
        </div>
      ),
    },
    {
      path: "/setting",
      element: (
        <div>
          <SettingPage />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <LoginPage />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <SignUpPage />
        </div>
      ),
    },
    {
      path: "/changepassword",
      element: (
        <div>
          <ChangePasswordPage />
        </div>
      ),
    },
    {
      path: "/modal",
      element: (
        <div>
          <modal />
        </div>
      ),
    },
    {
      path: "/user/:userId",
      element: (
        <div>
          <UserProfilePage />
        </div>
      ),
    },
    {
      path: "/availability/:bookId",
      element: (
        <div>
          <AvailabilityPage />
        </div>
      ),
    },
    {
      path: "/editprofile",
      element: (
        <div>
          <EditProfilePage />
        </div>
      ),
    },
    {
      path: "/uploadprofilepic",
      element: (
        <div>
          <UpdateProfilePic />
        </div>
      ),
    },
    {
      path: "/deleteprofilepic",
      element: (
        <div>
          <DeleteProfilePic />
        </div>
      ),
    },
    {
      path: "/choosebook/:NotificationId/:userId",
      element: (
        <div>
          <ChooseBook />
        </div>
      ),
    },
    {
      path: "/message/:chatId",
      element: (
        <div>
          <ChatPage />
        </div>
      ),
    },
  ]);

  return (
    <>
      <div className="App md:bg-purple-50">
        <LoginContext.Provider
          value={{ setUserLogin, setModalOpen }}
          login={userLogin}
        >
          <SocketProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" />
            {modalOpen && <Modal setModalOpen={setModalOpen} />}
          </SocketProvider>
        </LoginContext.Provider>
      </div>
    </>
  );
}

export default App;
