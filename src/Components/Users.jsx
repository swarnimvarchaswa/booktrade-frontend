import React from "react";
import { Link } from "react-router-dom";

export default function UserList({ data, loggedInUserId }) {

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
        No users found.
      </div>
    );
  }

  // Define the getYearText function outside the JSX
  const getYearText = (year) => {
    switch (year) {
      case "1":
        return "First Year";
      case "2":
        return "Second Year";
      case "3":
        return "Third Year";
      case "4":
        return "Fourth Year";
      case "5":
        return "Fifth Year";
      case "6":
        return "Sixth Year";
      case "7":
        return "Seventh Year";
      default:
        return "Loading...";
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      {data.map((user) => (
        <div
          key={user._id}
          className="flex flex-row bg-purple-100 border-2 rounded-lg border-purple-300 px-4 py-2 mt-8"
        >
          <div className="basis-1/4 flex justify-center">
            <img
              className="h-[60px] w-[60px] mx-2 my-1 border-solid rounded-full border-2 border-purple-500"
              src={user.profilePic}
              alt={user.name}
            />
          </div>
          <div className="basis-3/4 content place-self-center pr-2">
            <div className="grid grid-row text-left text-base mx-2">
              <Link to={`/user/${user._id}`}>
                <h2 className="pe-1 font-r tracking-wide line-clamp-1 text-xl text-purple-500">
                  {user.name}
                </h2>
              </Link>
              <p className="font-r tracking-wide text-gray-600 ">
                {user.collegeDegree}, {getYearText(user.year)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}