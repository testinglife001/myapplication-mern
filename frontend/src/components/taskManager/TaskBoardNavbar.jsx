import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import Navbar from "../home/Navbar";
import { Link } from 'react-router-dom';


const TaskBoardNavbar = () => {


  return (
    <div  >
        
        <div style={{marginTop:'70px'}}
            className="d-flex justify-content-between align-items-center bg-white px-3 py-2 sticky-top z-index-10">
        
        <div className="d-flex">
            
            <button 
                // onClick={() => dispatch(setOpenSidebar(true))} 
                className="btn btn-light d-md-none">
                ☰
            </button>
            
           <br />
            
            <div className="w-100 d-flex align-items-center py-2 px-3 gap-2 rounded-pill bg-light">
                
               {/* <MdOutlineSearch className="text-secondary" /> */}
                <input type="text" placeholder="Search...." className="form-control border-0 bg-transparent placeholder-secondary" />
            </div>
        </div>
        <div className="d-flex gap-2 align-items-center">
            {/* Additional elements can go here */}
        </div>
        </div>
    </div>
  );
};

export default TaskBoardNavbar;
