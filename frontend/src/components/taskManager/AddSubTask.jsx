// import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Textbox from "./Textbox";
import Button from "./Button";
import { add_subtask_manager } from "../../store/actions/home/taskManagerAction";

const AddSubTask = ({ open, setOpen, id }) => {

  // console.log(id);

  const dispatch = useDispatch();

  const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

  const [state, setState] = useState({
    title: '',
    date: '',
    tag: ''
  });

  const inputHandle = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
  }

  // console.log(id);

  // const {
  //  register,
  //  handleSubmit,
  //  formState: { errors },
  // } = useForm();

  // const handleOnSubmit = async (data) => {
    // try {
    //   const res = await addSbTask({ data, id }).unwrap();
    //   toast.success(res.message);
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err?.data?.message || err.error);
    // }
  // };

  useEffect(() => {
    // dispatch(add_subtask_manager(id));
  },[]);

  // console.log(id);

  const addSubTask = (e) => {
    e.preventDefault();
    // console.log(id);
    // console.log(state);
    // console.log(state,id);
    // const {title,date,tag} = state;
    // console.log(state);
    
    // console.log({state,id});
    
    // console.log({...state,id});
    // console.log({...state,_id:task._id});
    // dispatch(add_subtask_manager(state,id));
    dispatch(add_subtask_manager({state,id}));
  }

  return (
    <Modal show={open} onHide={() => setOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>ADD SUB-TASK</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form  onSubmit={addSubTask}    >
          <div className="mb-3">
            {/* 
            <Textbox
              placeholder="Sub-Task title"
              type="text"
              name="title"
              label="Title"
              className="w-100"
              // register={register("title", {
              //  required: "Title is required!",
              // })}
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

          <div className="row mb-3">
            <div className="col">
              {/* 
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-100"
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
            <div className="col">
              {/* 
              <Textbox
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className="w-100"
                // register={register("tag", {
                //  required: "Tag is required!",
                // })}
                // error={errors.tag ? errors.tag.message : ""}
              />
              */}

              <input 
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className="w-100 rounded"
                value={state.tag}
                onChange={inputHandle}
              /> 
              
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3">
            <Button
              type="submit"
              className="btn btn-primary fw-semibold"
              label="Add Task"
            />

            <Button
              type="button"
              className="btn btn-light border fw-semibold"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSubTask;
