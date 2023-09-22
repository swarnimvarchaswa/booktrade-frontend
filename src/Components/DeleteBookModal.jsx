import React from "react";

function DeleteBookModal({ isOpen, onCancel, onDeleteCallback }) {
    if(!isOpen){
        return null;
    }
  return (
    isOpen && (
      <div
        className="fixed z-0 inset-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40"
        onClick={onCancel}
      >
        <div className="relative z-10 w-72  py-2 text-center bg-white rounded-xl">
          <div className="py-5 font-medium font-r tracking-wide">
            <p className="">Delete this book from account</p>
          </div>
          <hr />
          <div className="grid justify-stretch">
            <button
              className="py-3 font-medium font-r tracking-wider text-red-500"
              onClick={() => {
                onDeleteCallback();
                onCancel();
              }}
            >
              Delete
            </button>
            </div>
            <hr />
            <div className="grid justify-stretch">
            <button
              className="cancelbtn py-3 font-r tracking-wider"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteBookModal;