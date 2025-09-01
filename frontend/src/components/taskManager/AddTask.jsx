import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from "react-bootstrap";
// import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { MdCheck } from "react-icons/md";
import Button from "./Button";
import Textbox from "./Textbox";
import UserList from "./UserList";
import SelectList from "./SelectList";
import { add_task_manager, get_all_user } from "../../store/actions/home/taskManagerAction";
// import { add_task, get_all_user } from "../../store/actions/home/taskAction";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task, history }) => {

  const dispatch = useDispatch();

  const {allUser} = useSelector(state=>state.taskManagerReducer);

  useEffect(() => {
    dispatch(get_all_user());
  },[]);

  // const task = "";
   
  const [state, setState] = useState({
    title: '',
    date: '',
  })

   const [team, setTeam] = useState(task?.team || []);
   const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
   const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
   );
   const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [selected, setSelected] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (user) => {
    let updatedUsers;
    if (selectedUsers.some((u) => u._id === user._id)) {
      updatedUsers = selectedUsers.filter((u) => u._id !== user._id);
    } else {
      updatedUsers = [...selectedUsers, user];
    }

    setSelectedUsers(updatedUsers);
    setTeam(updatedUsers.map((u) => u._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      allUser && setSelectedUsers(allUser);
    } else {
      setSelectedUsers(team);
    }
  }, []);

  const inputHandle = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
  }

  
   const addTask =  (e) => {
       e.preventDefault();
        const {title,team,stage,priority,date,assets} = state;
        dispatch(add_task_manager(state));
    }

  /*
  const submitHandler =  async (data) => {
    
    try {
      const newData = {
        ...data,
        assets: [],
        team,
        stage,
        priority
      };
      await dispatch(add_task(newData));
    } catch (error) {
      console.log(error);
    }
    
    // dispatch(add_task(data));
  };
  */

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <Modal show={open} onHide={() => setOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{task ? "UPDATE TASK" : "ADD TASK"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form   
            //onSubmit={submitHandler}
            onSubmit={addTask}
          >
          <div className="mb-3">
            {/* 
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-100 rounded"
              // register={register("title", { required: "Title is required" })}
              // error={errors.title ? errors.title.message : ""}
            />
            */}
            <input 
                placeholder="Task Title"
                type="text"
                name="title"
                label="Task Title"
                className="w-100 rounded"
                value={state.title}
                onChange={inputHandle}
            />
            
          </div>

          <div className="mb-3">
            {/* 
            <UserList setTeam={setTeam} team={team} />
            */}
            Assign Task To:
            <label>User List</label>
            <select className="form-select"
                  id="multiple-select-field"  
                  aria-label="Default select example" 
                  name="team"  
                  data-placeholder="Choose anything" multiple
                  // value={state.team}
                  onChange={inputHandle}
                  >
              <option selected >Open this user list select menu</option>
              {
                allUser.length > 0 ?
                allUser.map((user,index) => (
                  <>
                  <option key={index} value={user._id} 
                   onClick={() => handleChange(user)}
                    > 
                    {user.userName} 
                  </option>            
                 
                  </>
                ))              
                :
                ''
              }

            </select>
               

          </div>

          <div className="row mb-3">
            <div className="col">
              {/* 
              <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />
              */}
            
              <label>Task Stage</label>
              <select className="form-select"
                    id="multiple-select-field"  
                    aria-label="Default select example" 
                    name="stage"  
                    data-placeholder="Choose anything" 
                    // value={state.stage}
                    onChange={inputHandle}
                    >
                <option selected >Select an option</option>
                {
                  // stageLists.length > 0 ?
                  // lists = {LISTS} ?
                  LISTS.map((stageList,index) => (
                    <>
                    <option key={index} 
                    onClick={() => setSelected(stageList)}
                      > 
                      {stageList}
                    </option>            
                     <span className="text-truncate">{stageList}</span>
                     {selected === stageList && <MdCheck className="text-primary" />}
                    </>
                  ))
                  // :
                  // ''                 
                }

              </select>

            </div>

            <div className="col">
              {/* 
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-100 rounded"
                value={state.date}
                onChange={inputHandle}
                // register={register("date", {
                //  required: "Date is required!",
                // })}
                // error={errors.date ? errors.date.message : ""}
              />
              */}
              

              <input 
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-100 rounded"
                value={state.date}
                onChange={inputHandle}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              {/* 
              <SelectList label="Priority Level" lists={PRIORITY} selected={priority} setSelected={setPriority} />
              */}
              

              <label>Priority Level</label>
              <select className="form-select"
                    id="multiple-select-field"  
                    aria-label="Default select example" 
                    name="priority"  
                    data-placeholder="Choose anything" 
                    // value={state.priority}
                    onChange={inputHandle}
                    >
                <option selected >Select an option</option>
                {
                  // priorityLists.length > 0 ?
                  PRIORITY.map((priorityList,index) => (
                    <>
                    <option key={index} 
                    onClick={() => setSelected(priorityList)}
                      > 
                      {priorityList}
                    </option>            
                     <span className="text-truncate">{priorityList}</span>
                     {selected === priorityList && <MdCheck className="text-primary" />}
                    </>
                  )) 
                  // :
                  // ''             
                }

              </select>

            </div>

            <div className="col d-flex align-items-center justify-content-center">
              <label className="text-primary cursor-pointer" htmlFor="imgUpload">
                <input
                  type="file"
                  className="d-none"
                  id="imgUpload"
                  onChange={(e) => handleSelect(e)}
                  accept=".jpg, .png, .jpeg"
                  multiple
                />
                <BiImages className="me-1" />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3">
            {uploading ? (
              <span className="text-danger small py-2">Uploading assets</span>
            ) : (
              <Button label="Submit" type="submit" className="btn btn-primary px-4 fw-semibold" />
            )}

            <Button
              type="button"
              className="btn btn-light border px-4 fw-semibold"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
