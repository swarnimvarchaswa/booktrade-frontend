import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment"; // Import moment.js

function formatTimestamp(timestamp) {
  // return moment(timestamp).format("h:mm A");
  return moment(timestamp).format("MMMM Do, YYYY h:mm A");
}

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //login user id
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

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Send a GET request to fetch notifications
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
        const data = await response.json();
        setNotifications(data.notifications);
        // console.log("Request data:", data);
      } else {
        // Handle the case when the request fails
        console.error("Failed to fetch notifications");
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const rejectRequest = async (notification) => {
    try {
      const response = await fetch(
        "https://booktrade-api.onrender.com/notification",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            notificationId: notification, // Assuming you have NotificationId in your component's state
            newStatus: "reject", // Set the new status as needed
          }),
        }
      );
      if (response.ok) {
        fetchNotifications();
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const acceptBorrowRequest = async (notification) => {
    try {
      const response = await fetch(
        "https://booktrade-api.onrender.com/notification",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            notificationId: notification, // Assuming you have NotificationId in your component's state
            newStatus: "accept", // Set the new status as needed
            newRequest: "borrow",
          }),
        }
      );
      if (response.ok) {
        fetchNotifications();
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const confirmButton = async (notification) => {
    try {
      const response = await fetch(
        "https://booktrade-api.onrender.com/exchange",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            notificationId: notification, // Assuming you have NotificationId in your component's state
            newStatus: "exchange", // Set the new status as needed
            newConfirmId: loggedInUserId,
          }),
        }
      );
      if (response.ok) {
        fetchNotifications();
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const confirmExchange = async (notification) => {
    try {
      const response = await fetch(
        "https://booktrade-api.onrender.com/exchange",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            notificationId: notification, // Assuming you have NotificationId in your component's state
            newStatus: "confirm", // Set the new status as needed
          }),
        }
      );
      if (response.ok) {
        // fetchNotifications();
        if (notification.respondBookId) {
          exchangeBook(notification);
        } else fetchNotifications();
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const exchangeBook = async (notificationId) => {
    try {
      const response = await fetch(
        "https://booktrade-api.onrender.com/exchangebook",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            notificationId: notificationId,
          }),
        }
      );
      if (response.ok) {
        // fetchNotifications();
        navigate("/profile");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  function handleSendMessage(userId) {
    // Make a fetch request to create or retrieve a chat
    fetch("https://booktrade-api.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ userId: userId }), // Include the userId in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the chat page using the chatId from the response
        navigate(`/message/${data.chatId}`);
      })
      .catch((error) => {
        console.error("Error creating/retrieving chat:", error);
      });
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-4">
      <div className="grid grid-cols-1 gap-5 w-full">
        {/* loader */}
        {isLoading && (
          <img
            className="max-w-md w-full mx-auto"
            src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
            alt="Loading"
          />
        )}
        {/* if no notification */}
        {!isLoading && notifications.length === 0 && (
          <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
            No new notifications
          </div>
        )}
        {/* notifications */}
        {notifications.map((notification) => (
          <div key={notification._id}>
            {/* pending.......................................................................................................................................................... */}

            {/* pending sender */}

            {notification.status === "pending" &&
              notification.senderId._id === loggedInUserId && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      Your request for the{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.bookId.bookName}
                      </span>{" "}
                      for{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.request}
                      </span>{" "}
                      has been forwarded to{" "}
                      <Link
                        to={`/user/${notification.ownerId._id}`}
                        className="text-purple-600 font-medium"
                      >
                        {notification.ownerId.name}
                      </Link>
                      .
                    </p>
                    <p className="mt-2 mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      You can also message them for any queries.
                    </p>
                  </div>
                  <div className="grid justify-items-stretch max-w-md mx-auto px-4 my-8">
                    <button
                      className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-lg"
                      onClick={() =>
                        handleSendMessage(notification.ownerId._id)
                      } // Use the callback function
                    >
                      Message
                    </button>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* pending owner exchange */}

            {notification.status === "pending" &&
              notification.ownerId._id === loggedInUserId &&
              notification.request === "exchange" && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      <Link
                        to={`/user/${notification.senderId._id}`}
                        className="text-purple-600 font-medium"
                      >
                        {notification.senderId.name}
                      </Link>{" "}
                      wants to{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.request}
                      </span>{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.bookId.bookName}
                      </span>{" "}
                      from you. Choose a book from his library.
                    </p>
                  </div>

                  <div className=" my-8 flex flex-row gap-1 mx-4">
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-purple-500 text-white hover:bg-purple-600 text-lg border-purple-500"
                      onClick={() =>
                        navigate(
                          `/choosebook/${notification._id}/${notification.senderId._id}`
                        )
                      }
                    >
                      Choose Book
                    </button>
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:border-purple-500 text-lg"
                      onClick={() => rejectRequest(notification._id)}
                    >
                      Reject
                    </button>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* pending owner borrow */}

            {notification.status === "pending" &&
              notification.ownerId._id === loggedInUserId &&
              notification.request === "borrow" && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      <Link
                        to={`/user/${notification.senderId._id}`}
                        className="text-purple-600 font-medium"
                      >
                        {notification.senderId.name}
                      </Link>{" "}
                      wants to borrow{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.bookId.bookName}
                      </span>{" "}
                      from you.
                    </p>
                  </div>
                  <div className=" my-8 flex flex-row gap-1 mx-4">
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-purple-500 text-white hover:bg-purple-600 text-lg border-purple-500"
                      onClick={() => acceptBorrowRequest(notification._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:border-purple-500 text-lg"
                      onClick={() => rejectRequest(notification._id)}
                    >
                      Reject
                    </button>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* reject.......................................................................................................................................................... */}

            {/* reject sender */}

            {notification.status === "reject" &&
              notification.senderId._id === loggedInUserId && (
                <div className="text-left border-2 border-red-300 rounded-lg bg-red-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      Your request for{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.bookId.bookName}
                      </span>{" "}
                      has been declined by{" "}
                      <Link
                        to={`/user/${notification.ownerId._id}`}
                        className="text-purple-600 font-medium"
                      >
                        {notification.ownerId.name}.
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-red-500 w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* rject owner*/}

            {notification.status === "reject" &&
              notification.ownerId._id === loggedInUserId && (
                <div className="text-left border-2 border-red-300 rounded-lg bg-red-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      You have declined{" "}
                      <Link
                        to={`/user/${notification.senderId._id}`}
                        className="text-purple-600 font-medium"
                      >
                        {notification.senderId.name}'s
                      </Link>{" "}
                      request for{" "}
                      <span className="text-gray-600 font-medium">
                        {notification.bookId.bookName}.
                      </span>{" "}
                    </p>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-red-500 w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* accept ...................................................................................................................................................... */}

            {/* accept sender*/}

            {notification.status === "accept" &&
              notification.senderId._id === loggedInUserId && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    {/* when book is exchange  */}

                    {notification.request === "exchange" && (
                      <>
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Your request for{" "}
                          <span className="text-gray-600 font-medium">
                            {notification.bookId.bookName}
                          </span>{" "}
                          has been accepted by{" "}
                          <Link
                            to={`/user/${notification.ownerId._id}`}
                            className="text-purple-600 font-medium"
                          >
                            {notification.ownerId.name}
                          </Link>
                          . In exchange for{" "}
                          <span className="text-gray-600 font-medium">
                            {notification.respondBookId.bookName}
                          </span>
                          .
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Use the message button to contact and exchange within
                          your college campus.
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Once received your book, kindly click the confirmation
                          button so we can be notified of the successful
                          exchange.
                        </p>
                      </>
                    )}

                    {/* when book is borrowed */}

                    {notification.request === "borrow" && (
                      <>
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Your borrow request for{" "}
                          <span className="text-gray-600 font-medium">
                            {notification.bookId.bookName}
                          </span>{" "}
                          has been accepted by{" "}
                          <Link
                            to={`/user/${notification.ownerId._id}`}
                            className="text-purple-600 font-medium"
                          >
                            {notification.ownerId.name}
                          </Link>
                          .
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Use the message button below to contact and get book
                          within your college campus.
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Once received your book, kindly click the confirmation
                          button so we can be notified of the successful
                          exchange.
                        </p>
                      </>
                    )}
                  </div>
                  <div className=" my-8 flex flex-row gap-1 mx-4">
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-purple-500 text-white hover:bg-purple-600 text-lg border-purple-500"
                      onClick={() => confirmButton(notification._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:border-purple-500 text-lg  "
                      onClick={() =>
                        handleSendMessage(notification.ownerId._id)
                      }
                    >
                      Message
                    </button>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* accept owner */}

            {notification.status === "accept" &&
              notification.ownerId._id === loggedInUserId && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    {/* when book is exchange  */}

                    {notification.request === "exchange" && (
                      <>
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          You have accepted the request from{" "}
                          <Link
                            to={`/user/${notification.senderId._id}`}
                            className="text-purple-600 font-medium"
                          >
                            {notification.senderId.name}
                          </Link>{" "}
                          for book{" "}
                          <span className="text-gray-600 font-medium">
                            {notification.bookId.bookName}
                          </span>
                          . In exchange for{" "}
                          <span className="text-gray-600 font-medium">
                            {notification.respondBookId.bookName}
                          </span>
                          .
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Use the message button to contact and exchange within
                          your college campus.
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Once received your book, kindly click the confirmation
                          button so we can be notified of the successful
                          exchange.
                        </p>
                      </>
                    )}

                    {/* when book is borrowed */}

                    {notification.request === "borrow" && (
                      <>
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          You have accepted the borrow request from{" "}
                          <Link
                            to={`/user/${notification.senderId._id}`}
                            className="text-purple-600 font-medium"
                          >
                            {notification.senderId.name}
                          </Link>{" "}
                          for book{" "}
                          <span className="text-gray-600 font-medium">
                            {notification.bookId.bookName}
                          </span>
                          .
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Use the message button below to contact and give book
                          within your college campus.
                        </p>
                        <br />
                        <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                          Once received your book, kindly click the confirmation
                          button so we can be notified of the successful
                          exchange.
                        </p>
                      </>
                    )}
                  </div>
                  <div className=" my-8 flex flex-row gap-1 mx-4">
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-purple-500 text-white hover:bg-purple-600 text-lg border-purple-500"
                      onClick={() => confirmButton(notification._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="font-r tracking-wide basis-1/2 border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:border-purple-500 text-lg  "
                      onClick={() =>
                        handleSendMessage(notification.senderId._id)
                      }
                    >
                      Message
                    </button>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* exchange................................................................................................................................................... */}

            {/* exchange who confirm book */}

            {notification.status === "exchange" &&
              // notification.ownerId === loggedInUserId &&
              notification.confirmId === loggedInUserId && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      Thank you for your response we will complete this exchange
                      when other user also confirm the same.
                    </p>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* exchange who dont confirm book */}

            {notification.status === "exchange" &&
              // notification.ownerId === loggedInUserId &&
              notification.confirmId !== loggedInUserId && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      Please confirm to complete this exchange.
                    </p>
                  </div>
                  <div className="grid justify-items-stretch max-w-md mx-auto px-4 my-8">
                    <button
                      className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-white text-gray-600 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-lg "
                      onClick={() => confirmExchange(notification._id)}
                    >
                      Confirm Book exchange
                    </button>
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-1/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-white w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}

            {/* confirm.................................................................................................................................................... */}

            {/* confirm book exchange  */}

            {notification.status === "confirm" &&
              (notification.ownerId._id === loggedInUserId ||
                notification.senderId._id === loggedInUserId) && (
                <div className="text-left border-2 border-green-300 rounded-lg bg-green-100 shadow-md px-4 py-4">
                  <div>
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      Book exchange successfully completed.
                    </p>

                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      For anything feel free to contact us.
                    </p>
                    <br />
                    <p className="mx-4 font-r tracking-wide text-gray-600 leading-relaxed">
                      Happy Reading :)
                    </p>
                    <br />
                  </div>
                  <div className="relative mt-4 pb-4 mx-4">
                    <hr className="box-border border-solid border-[2px] rounded-full border-white w-full justify-center absolute " />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex left-0 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-1/3  top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex inset-x-2/3 top-[-4px]" />
                    <hr className="border-solid border-[6px] rounded-full border-green-500 w-0 absolute flex right-0 top-[-4px]" />
                  </div>
                </div>
              )}
            <p
              className={`text-[10px] text-right pt-1 lg:text-xs font-r tracking-wide text-gray-500 `}
            >
              {formatTimestamp(notification.createdAt)} {/* Format timestamp */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
