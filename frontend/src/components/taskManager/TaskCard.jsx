import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

import { useSelector } from "react-redux";

import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from  "./utils";

// import TaskDialog from "./task/TaskDialog";

import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";

import UserInfo from "./UserInfo";

import { IoMdAdd } from "react-icons/io";

import TaskDialog from "./TaskDialog";
import AddSubTask from "./AddSubTask";

// import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  //const { user } = useSelector((state) => state.auth);
  const {userInfo} = useSelector(state => state.adminReducer);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-100 bg-white shadow p-4 rounded">
        <div className="d-flex justify-content-between">
          <div
            className={clsx(
              "d-flex flex-grow-1 gap-1 align-items-center text-body-secondary fw-medium",
              PRIOTITYSTYELS[  task?.priority  ]
            )}
          >
            <span className="fs-5">{ICONS[  task?.priority  ]}</span>
            <span className="text-uppercase">
              {  task?.priority  } Priority
            </span>
          </div>
        
        
         
        {
          // userInfo?.role === 'admin' && <TaskDialog task={task} />
           <TaskDialog task={task} />
        }
        
        
          
        </div>

        <div className="d-flex align-items-center gap-2 mt-2">
          <div
            className={clsx("rounded-circle", TASK_TYPE[  task.stage  ])}
            style={{ width: "16px", height: "16px" }}
          />
          <h4 className="text-truncate text-dark">
            {  task?.title  }
          </h4>
        </div>
        <span className="text-muted small">
          {  formatDate(new Date(task?.date))  }
        </span>

        <hr className="my-2" />
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1 text-muted small">
              <BiMessageAltDetail />
              <span>{  task?.activities?.length  }</span>
            </div>
            <div className="d-flex align-items-center gap-1 text-muted small">
              <MdAttachFile />
              <span>{  task?.assets?.length  }</span>
            </div>
            <div className="d-flex align-items-center gap-1 text-muted small">
              <FaList />
              <span>0/{  task?.subTasks?.length  }</span>
            </div>
          </div>

          <div className="d-flex flex-row-reverse">
            {
              
              task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "d-flex align-items-center justify-content-center rounded-circle text-white small",
                  BGS[index % BGS?.length]
                )}
                style={{ width: "28px", height: "28px", marginRight: "-5px" }}
              >
                <UserInfo user={m} />
              </div>
              ))
              
            }
          </div>
        </div>

        {/* Subtasks */}
        {
          
          task?.subTasks?.length > 0 ? (
          <div className="py-3 border-top">t
            <h5 className="text-dark text-truncate">{task?.subTasks[0].title}</h5>

            <div className="px-3 py-2">d
              <span className="text-muted small">{formatDate(new Date(task?.subTasks[0]?.date))}</span>
              <span className="badge bg-primary ms-2">{task?.subTasks[0].tag}</span>
            </div>
          </div>
        ) : (
          <div className="py-3 border-top">
            <span className="text-muted">No Sub Task</span>
          </div>
        )
         
        }

        <div className="w-100 pb-2">
          <button
            onClick={() => setOpen(true)}
            // disabled={!userInfo?.role === 'admin'}
            className="btn btn-link text-decoration-none text-muted fw-semibold d-flex align-items-center gap-2"
          >
            <IoMdAdd className="fs-5" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>
    
    
     
         <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    
    
     
    </>
  );
};

export default TaskCard;
