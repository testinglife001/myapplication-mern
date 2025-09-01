import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";


const TaskTitle = ({ label, className }) => {
  return (
    <div className="w-100 h-10 h-md-12 px-2 px-md-4 rounded bg-white d-flex align-items-center justify-content-between shadow-sm">
      <div className="d-flex gap-2 align-items-center">
        
        <div className={clsx("rounded-circle", className)} 
            style={{ width: "16px", height: "16px" }} 
        />

        <p className="text-secondary fs-6">{label}</p>
        
      </div>

      <button className="d-none d-md-block border-0 bg-transparent">
        <IoMdAdd className="fs-5 text-dark" />
      </button>
    </div>
  );
};

export default TaskTitle;
