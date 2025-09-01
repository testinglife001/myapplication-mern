// import React from 'react'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Title from "./Title";
import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "./data";
import { getInitials } from "./utils";
import ConfirmatioDialog, { UserAction } from "./Dialogs";
import AddUser from "./AddUser";
import { get_all_task_manager, get_all_user } from "../../store/actions/home/taskManagerAction";
import TaskBoardSidebar from "./TaskBoardSidebar";

const Users = () => {

  const dispatch = useDispatch();
   const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

   useEffect(() => {
      dispatch(get_all_task_manager('','',''));
   },[]);

   useEffect(() => {
      dispatch(get_all_user());
   },[])
  
  // console.log(allUser);
  // console.log(allTaskManage);

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className="border-bottom border-secondary-subtle">
      <tr className="text-black text-start">
        <th className="py-2">Full Name</th>
        <th className="py-2">Title</th>
        <th className="py-2">Email</th>
        <th className="py-2">Role</th>
        <th className="py-2">Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-bottom border-light-subtle text-secondary hover-bg-light">
      <td className="p-2">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle text-white d-flex align-items-center justify-content-center bg-primary" style={{ width: "36px", height: "36px" }}>
            <span className="text-center fs-6">
              {/* getInitials(user.name) */}
              {
               // user?.userName
              }
            </span>
          </div>
          {
            //user.name
          }
          {
            // user?.userName
          }
        </div>
      </td>

      <td className="p-2">{/* user.title */}</td>
      <td className="p-2">{/* user.email || "user.email.com" */}</td>
      <td className="p-2">{/* user.role */}</td>

      <td>
        <button
          className={`btn rounded-pill px-3 py-1 ${user?.isActive ? "btn-primary" : "btn-warning"}`}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className="p-2 d-flex gap-3 justify-content-end">
        <Button
          className="text-primary fw-semibold border-0 bg-transparent"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />

        <Button
          className="text-danger fw-semibold border-0 bg-transparent"
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <div>
      Users
      {/* 
      <TaskBoardSidebar />
      */}
      
    
      <div className="container mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="fs-5" />}
            className="d-flex align-items-center gap-2 btn btn-primary rounded"
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="bg-white p-3 shadow-sm rounded">
          <div className="table-responsive">
            <table className="table mb-3">
              <TableHeader />
              <tbody>
                {
                  /*
                  summary.users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))
                  */
                }

                {
                  allUser?.map((user,index) =>  (
                    <TableRow key={index} user={user} />
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser open={open} 
          setOpen={setOpen} 
          userData={selected} 
          key={new Date().getTime().toString()} 
          />

      <ConfirmatioDialog 
          open={openDialog} 
          setOpen={setOpenDialog} 
          onClick={deleteHandler} 
          />

      <UserAction 
          open={openAction} 
          setOpen={setOpenAction} 
          onClick={userActionHandler} 
          />


    </div>
  )
}

export default Users