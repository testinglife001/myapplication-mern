import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
import { MdEditDocument } from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { summary } from "./data";
import moment from "moment";
import { BGS, TASK_TYPE, PRIOTITYSTYELS, getInitials } from "./utils";
import clsx from "clsx";
import UserInfo from "./UserInfo";
import { get_all_task_manager, get_all_user } from "../../store/actions/home/taskManagerAction";


const TaskTable = ( /*{  tasks   }*/  ) => {

    const totals = summary.tasks;
    //  console.log(totals);
    //  console.log(summary.tasks);

    const dispatch = useDispatch();
    const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

    useEffect(() => {
       dispatch(get_all_task_manager('','',''));
    },[])
  
    // console.log(allUser);
    // console.log(allTaskManage);

    const ICONS = {
      high: <MdKeyboardDoubleArrowUp />,
      medium: <MdKeyboardArrowUp />,
      low: <MdKeyboardArrowDown />,
    };
  
    const TableHeader = () => (
      <thead className="border-bottom">
        <tr className="text-dark text-start">
          <th className="py-2">Task Title</th>
          <th className="py-2">Priority</th>
          <th className="py-2">Team</th>
          <th className="py-2 d-none d-md-table-cell">Created At</th>
        </tr>
      </thead>
    );
  
    const TableRow = ({ task }) => (
      <tr className="border-bottom text-secondary hover-bg-light">
        <td className="py-2">
          <div className="d-flex align-items-center gap-2">
          <div
            className={clsx("w-2 h-2 rounded-circle", 
                             TASK_TYPE[task?.stage]
                        )}
          />
            <p className="text-dark"> { task?.title } </p>
          </div>
        </td>
        <td className="py-2">
          <div className="d-flex gap-1 align-items-center">
            <span className={clsx("fs-5", 
                                     PRIOTITYSTYELS[task?.priority]
                            )}>
                 
                 {ICONS[task.priority]}
            </span>
            <span className='capitalize'>{ task?.priority }</span>

            
          </div>
        </td>
        <td className="py-2">
          <div className="d-flex">
            {
            /*
            task.team.map((m, index) => (
              <div
                  key={index}
                  className={clsx(
                    "rounded-circle d-flex align-items-center justify-content-center text-white text-sm me-1",
                    BGS[index % BGS.length]
                  )}
                  style={{ width: "28px", height: "28px" }}
                >
             
                <UserInfo 
                    // user={m} 
                  />
                
                             
              </div>
            ))
            */
            }
          </div>
        </td>
        <td className="py-2 d-none d-md-table-cell">
          <span className="text-secondary">
             { moment(task?.date).fromNow() }
          </span>
        </td>
      </tr>
    );
  
    return (
      <div className="w-100 col-md-8 bg-white p-3 shadow-sm rounded">
        <table className="table">
            
             
            <TableHeader />
            
            
          
          {
           
          <tbody>
            {
            /*
              tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))
            */
            }

            {
            
              allTaskManage?.tasks?.length > 0 ?
              allTaskManage?.tasks?.map((task, id) => (
                /*
                 <ul>
                 <li>  
                 </ul>  {task.title} 
                 </tbody>
                 </li>            
                </ul>
                */
              // ))
                <TableRow key={id} task={task} />
              ))              
              :
              ''
            }
          </tbody>
          
          }
          
        </table>
      </div>
    );
};

const UserTable = (/*{ users }*/) => {

    const dispatch = useDispatch();
    const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

    useEffect(() => {
       dispatch(get_all_task_manager('','',''));
    },[]);

    useEffect(() => {
      dispatch(get_all_user());
   },[]);
  
    // console.log(allUser);
    // console.log(allTaskManage);

  const TableHeader = () => (
    <thead className="border-bottom">
      <tr className="text-dark text-start">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-bottom text-secondary hover-bg-light">
      <td className="py-2">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle d-flex align-items-center justify-content-center text-white text-sm bg-primary" 
              style={{ width: "36px", height: "36px" }}>
            <span className='text-center'>
              {/* getInitials(user?.name) */}
              {
                 user?.userName
              }
            </span>
          </div>
          <div>
            <p>{
                  /* 
                  user.name 
                  */
                  user?.userName
                }
            </p>
              <span className='text-xs text-black'>{ user?.role }</span>
          </div>
        </div>
      </td>
      <td>
        <p
            className={clsx(
              "w-fit badge px-3 py-1 rounded-full text-sm",
              user?.isActive ? "bg-primary" : "bg-warning"
            )}
          >
           {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{ moment(user?.createdAt).fromNow() }</td>
    </tr>
  );

  return (
    <div className="w-100 col-md-4 bg-white p-3 shadow-sm rounded">
      <table className="table">
        <TableHeader />
        <tbody>
          {
          /*
          users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))
          */
          }
          
          {
            allUser?.map((user,index) =>  (
              <TableRow key={index + user?._id} user={user} />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};



const TaskBoard = () => {

    const totals = summary.tasks;
  //  console.log(totals);
  //  console.log(summary.tasks);


   const dispatch = useDispatch();
   const {userInfo} = useSelector(state => state.adminReducer);
   const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

   useEffect(() => {
      dispatch(get_all_task_manager('','',''));
   },[]);

   useEffect(() => {
      dispatch(get_all_user());
   },[])
  
   // console.log(userInfo);
   // console.log(allUser);
   // console.log(allTaskManage);


    const stats = [
        { _id: "1", label: "TOTAL TASK", total: summary?.totalTasks || 0, icon: <FaNewspaper />, bg: "bg-primary" },
        { _id: "2", label: "COMPLETED TASK", total: totals["completed"] || 0, icon: <MdAdminPanelSettings />, bg: "bg-success" },
        { _id: "3", label: "TASK IN PROGRESS", total: totals["in progress"] || 0, icon: <MdEditDocument />, bg: "bg-warning" },
        { _id: "4", label: "TODOS", total: totals["todo"], icon: <FaArrowsToDot />, bg: "bg-danger" },
    ];

    const Card = ({ label, count, bg, icon }) => {
        return (
          <div className="col-md-3 bg-white p-4 shadow-sm rounded d-flex align-items-center justify-content-between">
            <div>
              <p className="text-muted"> {label} </p>
              <h5 className="fw-bold"> {count} </h5>
              <small className="text-secondary">  110 last month </small>
            </div>

            <div className={clsx(
                    "rounded-circle d-flex align-items-center justify-content-center text-white",
                    bg
                )}
                style={{ width: "40px", height: "40px" }}
                >
              {icon}
            </div>
          </div>
        );
    };

  return (
    <div className="container py-4">
      <div className="row g-3">
        {
        
        stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))
        
        }
      </div>

      <div className="bg-white my-4 p-3 rounded shadow-sm">
        <h4 className="text-muted">Chart by Priority</h4>
        {/* 
        <Chart />
        */}
        
      </div>

      ww
      <br/>
          {
            allTaskManage?.tasks?.length
          }
          {
            
            allTaskManage?.tasks?.length > 0 ?
            allTaskManage?.tasks?.map((task) => (
              <ul>
              <li 
              
                > 
                {task.title} 
              </li>            
              
              
              </ul>
            ))              
            :
            ''
            
          }
      hh

      <div className="row g-3">
        
        
        <TaskTable 
          // tasks={summary.last10Task} 
          // tasks={allTaskManage?.tasks}
            />
        
        
        
        
        <UserTable 
          // users={summary.users} 
          // users={allUser}  
            />
        
        
        
      </div>
    </div>
  )
}

export default TaskBoard