import React from 'react';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MdDashboard, MdTaskAlt, MdOutlinePendingActions, MdOutlineAddTask, MdSettings } from 'react-icons/md';
import { FaTasks, FaUsers, FaTrashAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import clsx from "clsx";
import Navbar from '../home/Navbar';
import TaskBoardNavbar from './TaskBoardNavbar';

const linkData = [
    { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
    { label: "Tasks", link: "tasks", icon: <FaTasks /> },
    { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
    { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
    { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
    { label: "Team", link: "team", icon: <FaUsers /> },
    { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];


const TaskBoardSidebar = () => {

    const {userInfo} = useSelector(state => state.adminReducer);

    const dispatch = useDispatch();
    const location = useLocation();

    const path = location.pathname.split("/")[1];

    // const sidebarLinks = userInfo?.role === 'admin' ? linkData : linkData.slice(0, 5);
    const sidebarLinks = userInfo?.role === 'user' ? linkData : linkData.slice(0, 5);



    const NavLink = ({ el }) => {
        return (
          <Link
            to={el.link}
            // onClick={closeSidebar}
            className={clsx(
              "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
              path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
            )}
          >
            {el.icon}
            <span className='hover:text-[#2564ed]'>{el.label}</span>
          </Link>
        );
    };

  return (
    <div>
      <Navbar />
      <div className="container" style={{marginTop:'55px'}}>
      
        <div className="d-flex flex-column gap-3 p-3"  >
            <h1 className="d-flex align-items-center gap-2">
                <p className="bg-primary p-2 rounded-circle">
                    <MdOutlineAddTask className="text-white" style={{ fontSize: '24px', fontWeight: 'bold' }} />
                </p>
                <span className="h5 font-weight-bold text-dark">TaskMe</span>
            </h1>
            <TaskBoardNavbar />
            <div className="flex-grow-1 d-flex flex-column gap-3 py-4">
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>
            <div>
                <button className="btn btn-light w-100 d-flex align-items-center gap-2">
                    <MdSettings />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default TaskBoardSidebar