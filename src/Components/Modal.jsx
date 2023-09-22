import React from "react";

export default function Modal({ setModalOpen }) {

  return (
    <div
      className="fixed z-0 inset-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40 "
      onClick={() => setModalOpen(false)}
    >
      <div className="relative z-10 w-72  py-2 text-center bg-white rounded-xl">
        <div className="py-5 font-medium font-r tracking-wide">
          <p>Log out of your account?</p>
        </div>
        <hr className="" />
        <div className="grid justify-stretch">
          <button
            className="logOutBtn py-3 font-medium font-r tracking-wider text-red-500 "
            onClick={() => {
              setModalOpen(false);
              localStorage.clear();
            }}
          >
            Log out
          </button>
        </div>
        <hr className="" />
        <div className="grid justify-stretch">
          <button
            className="cancelbtn py-3 font-r tracking-wider"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
