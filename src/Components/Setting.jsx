import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../Features/Icons/SettingEditIcon";
import KeyIcon from "../Features/Icons/KeyIcon";
import VerificationIcon from "../Features/Icons/VerificationIcon";
import DonationIcon from "../Features/Icons/DonationIcon";
import MessageIcon from "../Features/Icons/MessageIcon";
import QuestionIcon from "../Features/Icons/QuestionIcon";
import LogoutIcon from "../Features/Icons/LogoutIcon";
import { LoginContext } from "../context/loginContext";

function Setting({login}) {
  const {setModalOpen} = useContext(LoginContext)
  return (
    <div className="container max-w-md mx-auto my-4">
      <div className="flex flex-clo ">
        <div>
          <p className="text-left font-r text-lg tracking-wide text-gray-700 px-4">
            Manage your Account
          </p>
          <Link
            to="/editprofile"
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide hover:text-purple-500 "
          >
            <EditIcon />
            <p>Edit Profile</p>
          </Link>
          <hr className="w-screen max-w-md " />
          <Link
            to="/changepassword"
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide hover:text-purple-500"
          >
            <KeyIcon />
            <p>Change Password</p>
          </Link>
          <hr className="w-screen max-w-md " />
          <Link
            to="/Verification"
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-400 hover:text-purple-500"
          >
            <VerificationIcon />
            <p>Verify for free</p>
          </Link>{" "}
          <hr className="w-screen max-w-md " />
          <Link
            to="/donate"
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-400 hover:text-purple-500"
          >
            <DonationIcon />
            <p>Donate Us</p>
          </Link>{" "}
          <hr className="w-screen max-w-md " />
          <Link
            to="/Contact"
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-400 hover:text-purple-500"
          >
            <MessageIcon />
            <p>Contact Us</p>
          </Link>{" "}
          <hr className="w-screen max-w-md " />
          <Link
            to="/faq"
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-400 hover:text-purple-500"
          >
            <QuestionIcon />
            <p>FAQ</p>
          </Link>{" "}
          <hr className="w-screen max-w-md " />
          <Link
            to=""
            className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-red-500 hover:text-red-600"
            onClick = {() => setModalOpen(true)}
          >
            <LogoutIcon />
            <p>Log Out from Account</p>
          </Link>
          <hr className="w-screen max-w-md " />
        </div>
      </div>
    </div>
  );
}

export default Setting;
