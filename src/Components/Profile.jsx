// import React, { useState } from "react";
// import ProfilePic from "./ProfilePic"; // Import the ProfilePic component

// function Profile({ user }) {
//   const [expand, setExpand] = useState(false);
//   const [changePic, setChangePic] = useState(false);

//   const toggleExpansion = () => {
//     setExpand(!expand);
//   };

//   const lineClampClass = expand ? "" : "line-clamp-1";

//   const getYearText = (year) => {
//     switch (year) {
//       case "1":
//         return "First Year";
//       case "2":
//         return "Second Year";
//       case "3":
//         return "Third Year";
//       case "4":
//         return "Fourth Year";
//       case "5":
//         return "Fifth Year";
//       case "6":
//         return "Sixth Year";
//       case "7":
//         return "Seventh Year";
//       default:
//         return "Loading...";
//     }
//   };

//   const handleProfilePicChange = () => {
//     setChangePic(!changePic);
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="container mx-auto px-4 mb-7 mt-8">
//         <div className="flex flex-col justify-center">
//           <div className="mx-auto ">
//             <img
//               onClick={handleProfilePicChange}
//               className="h-[150px] w-[150px] rounded-full border-solid border-2 border-purple-500"
//               src={user.profilePic}
//               alt="Profile Img"
//             />
//           </div>
//           <div className="my-6 font-r tracking-wide text-3xl text-gray-800">
//             <p>{user.name}</p>
//           </div>
//           <div className="font-r tracking-wide text-lg text-gray-500">
//             <p>
//               {user.collegeDegree}, {getYearText(user.year)}
//             </p>
//           </div>
//           <div
//             className={`font-r mt-2  tracking-wide text-xl text-gray-700 ${lineClampClass}`}
//           >
//             <p onClick={toggleExpansion}>{user.collegeName}</p>
//           </div>
//           {changePic && <ProfilePic changeProfile={handleProfilePicChange} />}
//         </div>
//       </div>
//       <hr />
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic"; // Import the ProfilePic component

function Profile({ user }) {
  const [expand, setExpand] = useState(false);
  const [changePic, setChangePic] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const toggleExpansion = () => {
    setExpand(!expand);
  };

  const lineClampClass = expand ? "" : "line-clamp-1";

  const getYearText = (year) => {
    switch (year) {
      case "1":
        return ", First Year";
      case "2":
        return ", Second Year";
      case "3":
        return ", Third Year";
      case "4":
        return ", Fourth Year";
      case "5":
        return ", Fifth Year";
      case "6":
        return ", Sixth Year";
      case "7":
        return ", Seventh Year";
      default:
        return "Loading";
    }
  };

  const handleProfilePicChange = () => {
    setChangePic(!changePic);
  };

  useEffect(() => {
    fetch("https://booktrade-backend.vercel.app//loginuser", {
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

  const userId = user._id

  return (
    <div className="max-w-md mx-auto">
      <div className="container mx-auto px-4 mb-7 mt-8">
        <div className="flex flex-col justify-center">
          <div className="mx-auto ">
            <img
              onClick={handleProfilePicChange}
              className="h-[150px] w-[150px] rounded-full border-solid border-2 border-purple-500"
              src={user.profilePic}
              alt=""
            />
          </div>
          <div className="my-6 font-r tracking-wide text-3xl text-gray-800">
            <p>{user.name}</p>
          </div>
          <div className="font-r tracking-wide text-lg text-gray-500">
            <p>
              {user.collegeDegree}{getYearText(user.year)}
            </p>
          </div>
          <div
            className={`font-r mt-2  tracking-wide text-xl text-gray-700 ${lineClampClass}`}
          >
            <p onClick={toggleExpansion}>{user.collegeName}</p>
          </div>
          {loggedInUserId === userId && changePic && (
            <ProfilePic changeProfile={handleProfilePicChange} />
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Profile;
