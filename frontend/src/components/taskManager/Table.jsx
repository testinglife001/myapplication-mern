import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "./utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";

import UserInfo from "./UserInfo";
import Button from "./Button";
import ConfirmatioDialog from "./Dialogs";
import { get_all_task_manager, get_all_user } from "../../store/actions/home/taskManagerAction";

// import UserInfo from "./UserInfo";
// import Button from "./Button";
// import ConfirmatioDialog from "./Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

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


  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  const TableHeader = () => (
    <thead className="border-bottom border-secondary-subtle">
      <tr className="text-black text-start">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Created At</th>
        <th className="py-2">Assets</th>
        <th className="py-2">Team</th>
        <th className="py-2 text-end">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-bottom border-light-subtle text-secondary table-hover">
      <td className="py-2">
        <div className="d-flex align-items-center gap-2">
          <div className={clsx("rounded-circle", TASK_TYPE[task.stage])} style={{ width: "16px", height: "16px" }} />
          <p className="text-truncate fw-medium text-dark">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className="d-flex gap-1 align-items-center">
          <span className={clsx("fs-5", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="text-capitalize">{task?.priority} Priority</span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-muted small">{formatDate(new Date(task?.date))}</span>
      </td>

      <td className="py-2">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex gap-1 align-items-center text-muted small">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="d-flex gap-1 align-items-center text-muted small">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="d-flex gap-1 align-items-center text-muted small">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className="py-2">
        <div className="d-flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "d-flex align-items-center justify-content-center rounded-circle text-white small",
                BGS[index % BGS?.length]
              )}
              style={{ width: "28px", height: "28px", marginRight: "-5px" }}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="py-2 d-flex gap-2 justify-content-end">
        <Button
          className="btn btn-link text-decoration-none text-primary fw-semibold"
          label="Edit"
          type="button"
        />

        <Button
          className="btn btn-link text-decoration-none text-danger fw-semibold"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white px-2 px-md-4 pt-4 pb-4 shadow rounded">
        <div className="table-responsive">
          <table className="table">
            <TableHeader />
            <tbody>
              {
              /*
              tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))
              */
              }

              {
          
                allTaskManage?.tasks?.length > 0 ?
                allTaskManage?.tasks?.map((task,index) => (
                  <TableRow
                    key={index}
                    task={task} 
                    />
                ))              
                :
                ''
                
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default Table;
