import React, { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // To display success or error messages

  const handleChangePassword = () => {
    // Validate the form input
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    // Send a PUT request to change the password
    fetch("https://booktrade-api.onrender.com/changepassword", {
      method: "PUT", // Change this to PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
          // Clear the input fields
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        setMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="max-w-md mx-auto px-12 my-12 container flex flex-col">
      {message === "An error occurred. Please try again later." ||
        (message === "All fields are required." && (
          <p className="text-red-400 px-3 mb-2 font-m tracking-wide text-sm text-left">
            {message}
          </p>
        ))}
        {message === "Password updated successfully" && (
          <p className="text-green-400 px-3 mb-2 font-m tracking-wide text-sm text-left">
            {message}
          </p>
        )}

      {/* {message && <div className="text-red-500 mb-4">{message}</div>} */}
      <div className="mb-6">
        <input
          type="password"
          id="oldpassword"
          placeholder="Old Password"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {message === "Invalid current password" && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <input
          type="password"
          id="newpassword"
          placeholder="New Password"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          id="confirmnewpassword"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {message === "New password and confirm password do not match." && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {message}
          </p>
        )}
      </div>
      <div className="grid justify-stretch mt-10">
        <button
          className="bg-purple-600 text-white py-3 px-4 rounded hover:bg-purple-700"
          onClick={handleChangePassword}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
