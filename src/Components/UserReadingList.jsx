import React from "react";

export default function Readinglist({ readinglist }) {
  if (!readinglist) {
    return (
      <div className="mt-6 text-m tracking-wide text-gray-600 text-lg ">
        Loading...
      </div>
    );
  }

  if (!Array.isArray(readinglist) || readinglist.length === 0) {
    return (
      <div className="mt-6 text-m tracking-wide text-gray-600 text-lg">
        Your reading list is empty.
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto px-4 mt-5">
      <div className="grid grid-cols-1 gap-2 w-full text-left border-2 rounded-lg  bg-purple-50 md:bg-white">
        <ul>
          {readinglist.map((item, index) => (
            <div key={index}>
              <li className="group flex justify-between items-center pr-4 py-4 pl-4 font-r tracking-wide text-gray-700 text-lg hover:bg-purple-200 focus:bg-purple-200 active:bg-purple-200 rounded">
                <div className="">
                  <span>- {item}</span>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
