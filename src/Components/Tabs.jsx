// import React, { useState } from "react";
// // import People from "./NameSearch";

// function Tab(props) {
//   const [activeTab, setActiveTab] = useState(1);

//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="mx-4  grid grid-cols-6 justify-items-stretch mt-8 border-[1px]  border-gray-300 rounded-md ">
//         <div className="col-start-1 col-end-4">
//           <div
//             className={` py-2 px-4 rounded-md ${
//               activeTab === 1
//                 ? "bg-purple-600 text-white"
//                 : "bg-white text-[#545454]"
//             }`}
//             onClick={() => handleTabClick(1)}
//           >
//             {props.firstButton}
//           </div>
//         </div>
//         <div className="col-start-4 col-end-7">
//           <div
//             className={` py-2 px-4 rounded-md ${
//               activeTab === 2
//                 ? "bg-purple-600 text-white"
//                 : "bg-white text-[#545454]"
//             }`}
//             onClick={() => handleTabClick(2)}
//           >
//             {props.secondButton}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tab;


import React from "react";

function Tab(props) {
  return (
    <div className="max-w-md mx-auto">
      <div className="mx-4  grid grid-cols-6 justify-items-stretch mt-8 border-[1px]  border-gray-300 rounded-md ">
        <div className="col-start-1 col-end-4">
          <div
            className={` py-2 px-4 rounded-md font-r tracking-wider ${
              props.activeTab === 1
                ? "bg-purple-600 text-white"
                : "bg-white text-[#545454]"
            }`}
            onClick={() => props.onTabChange(1)}
          >
            {props.firstButton}
          </div>
        </div>
        <div className="col-start-4 col-end-7">
          <div
            className={` py-2 px-4 rounded-md font-r tracking-wider ${
              props.activeTab === 2
                ? "bg-purple-600 text-white"
                : "bg-white text-[#545454]"
            }`}
            onClick={() => props.onTabChange(2)}
          >
            {props.secondButton}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tab;