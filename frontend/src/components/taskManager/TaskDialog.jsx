import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
 import { useHistory } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Dropdown } from "react-bootstrap";

import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "./Dialogs";
import { duplicate_task_manager } from "../../store/actions/home/taskManagerAction";

// import AddTask from "./AddTask";
// import AddSubTask from "./AddSubTask";
// import ConfirmatioDialog from "../Dialogs";

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

  // const navigate = useNavigate();

  // console.log(task._id);

  useEffect(() => {
   // dispatch(duplicate_task_manager(task._id));
  },[])
  

  const duplicateHandler =  () => {
     dispatch(duplicate_task_manager(task._id));
  };
  const deleteClicks = () => {
    setOpenDialog(true);
  };
  const deleteHandler = () => {};

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="me-2 fs-5" />,
       onClick: () =>  history.push(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="me-2 fs-5" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className="me-2 fs-5" />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className="me-2 fs-5" />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <div>
        
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            className="p-0 text-muted border-0 shadow-none"
          >
            
            <BsThreeDots className="fs-5" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow p-2">
            {items.map((el) => (
              <Dropdown.Item key={el.label} onClick={el?.onClick} className="d-flex align-items-center">
                {el.icon}
                {el.label}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => deleteClicks()}
              className="d-flex align-items-center text-danger"
            >
              <RiDeleteBin6Line className="me-2 fs-5 text-danger" />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <h3>task Id: {task._id}</h3>
      <AddSubTask open={open} setOpen={setOpen} id={task._id} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;
