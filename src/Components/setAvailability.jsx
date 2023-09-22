import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SetAvailability() {
  const { bookId } = useParams();
  const [bookAvailability, setBookAvailability] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [counterData, setCounterData] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);

  const calculateRemainingDays = (availabledate) => {
    const currentDate = new Date();
    const oldDate = new Date(availabledate);
    const timeDifference = oldDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  const makeDate = (daysToAdd) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + daysToAdd);
    return newDate;
  };

  const fetchBookDetail = () => {
    fetch(`https://booktrade-api.onrender.com/detail/${bookId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBookAvailability(result.availability);
      })
      .catch((err) => console.log(err));
  };

  const toggleAvailability = () => {
    const requestBody = {
      availability: bookAvailability,
    };

    fetch(`https://booktrade-api.onrender.com/availability/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setBookAvailability(data.book.availability);
      })
      .catch((error) => {
        console.error("Error updating availability:", error);
      });
  };

  const handleCounterUpdate = () => {
    const updatedCounter = Number(
      document.getElementById("counterInput").value
    );
    const updatedDate = makeDate(updatedCounter);
    setCounterData(updatedCounter);
    setAvailableDate(updatedDate);

    const updatedRemainingDays = calculateRemainingDays(updatedDate);
    setRemainingDays(updatedRemainingDays);

    if (updatedRemainingDays === 0) {
      toggleAvailability();
    }

    setSubmitClicked(true);
  };

  useEffect(() => {
    fetchBookDetail();
    fetchAvailableDate();
  }, [bookId]);

  const fetchAvailableDate = () => {
    fetch(`https://booktrade-api.onrender.com/availabledate/${bookId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const parsedDate = new Date(Date.parse(data)); // Parse the string into a Date object
        setAvailableDate(parsedDate);
      })
      .catch((error) => {
        console.error("Error retrieving available date:", error);
      });
  };

  useEffect(() => {
    if (submitClicked) {
      // Only run the effect when submitClicked is true
      const currentDate = new Date();
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + counterData);

      fetch(`https://booktrade-api.onrender.com/availabledate/${bookId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ counter: newDate.toISOString() }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error updating counter:", error);
        });

      setSubmitClicked(false); // Reset submitClicked after the effect runs
    }
  }, [submitClicked, counterData, bookId]);

  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
      <h2 className="font-r tracking-wide text-2xl font-normal text-gray-700 mt-6 text-center">
        Manage Book Availability
      </h2>
      {bookAvailability === "Available" ? (
        <p className="font-r tracking-wide text-lg mt-6 text-gray-700">
          Book Status: <span className="text-green-500">Available</span>
        </p>
      ) : (
        <div>
          <p className="font-r tracking-wide text-lg mt-6 text-gray-700">
            Book Status: <span className="text-red-500">Unavailable</span>
          </p>
          <p className="font-r tracking-wide text-lg mt-2 text-gray-700">
            Remaining Days: {calculateRemainingDays(availableDate)} days
          </p>
        </div>
      )}

      {bookAvailability === "Available" ? (
        <div className="grid justify-items-stretch px-4 mt-8">
          <button
            className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-red-50 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-500 hover:text-red-600 text-lg "
            onClick={toggleAvailability}
          >
            Make Book Unavailable
          </button>
        </div>
      ) : (
        <div className="grid justify-items-stretch px-4 mt-8">
          <button
            className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-green-50 border-green-200 text-green-500 hover:bg-green-100 hover:border-green-500 hover:text-green-600 text-lg "
            onClick={toggleAvailability}
          >
            Make Book Available Now
          </button>
        </div>
      )}

      {bookAvailability === "Unavailable" && (
        <div>
          <div className="mt-12">
            <input
              className="px-4 py-2 font-r text-lg border-2 border-solid rounded-lg"
              placeholder="Update Unavailable Days"
              id="counterInput"
              type="number"
            />
          </div>

          <div className="grid justify-items-stretch px-4 mt-4">
            <button
              className="font-r tracking-wider border-solid border-2 rounded-lg py-2 bg-blue-50 border-blue-200 text-blue-500 hover:bg-purple-100 hover:border-purple-500 hover:text-purple-600 text-lg "
              onClick={handleCounterUpdate}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
