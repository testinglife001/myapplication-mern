import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Spinner } from "react-bootstrap";
import Textbox from "./Textbox";
import Button from "./Button";
import { add_user } from "../../store/actions/home/taskManagerAction";

const AddUser = ({ open, setOpen, userData }) => {
  // let defaultValues = userData ?? {};
  // const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.adminReducer);

  const isLoading = false,
    isUpdating = false;

    const [state, setState] = useState({
      name: '',
      title: '',
      email: '',
      password:'',
      role: ''
    })

    const inputHandle = (e) => {
      setState({
          ...state,
          [e.target.name]: e.target.value
      })
    }

  // const {
  //  register,
  //  handleSubmit,
  //  formState: { errors },
  // } = useForm({ defaultValues });

  /*
  const handleOnSubmit = async (data) => {
    try {
      if(userData){

      }
      else{
        console.log(data);
        // const result = await add_user(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  */

  const addUser = (e) => {
    e.preventDefault();
    // console.log(state);
    //  console.log({...state,password:state.email});
    // dispatch(add_user(state));
    dispatch(add_user({...state,password:state.email}));
  }

  return (
    <Modal show={open} onHide={() => setOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{userData ? "UPDATE PROFILE" : "ADD NEW USER"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form 
           // onSubmit={handleSubmit(handleOnSubmit)}
            onSubmit={addUser}
            >
          <div className="mb-3">
            {/* 
            <Textbox
              placeholder="Full name"
              type="text"
              name="name"
              label="Full Name"
              className="w-100"
              // register={register("name", {
              //  required: "Full name is required!",
              // })}
              // error={errors.name ? errors.name.message : ""}
            />
            */}
            <input 
                placeholder="Full name"
                type="text"
                name="name"
                label="Full Name"
                className="w-100 rounded"
                value={state.name}
                onChange={inputHandle}
            />
          </div>

          <div className="mb-3">
            {/* 
            <Textbox
              placeholder="Title"
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
                placeholder="Title"
                type="text"
                name="title"
                label="Title"
                className="w-100 rounded"
                value={state.title}
                onChange={inputHandle}
            />
            <input 
                placeholder="Password"
                type="hidden"
                name="password"
                label="Password"
                className="w-100 rounded"
                value={state.email}
                onChange={inputHandle}
            />
          </div>

          <div className="mb-3">
            {/* 
            <Textbox
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              className="w-100"
              // register={register("email", {
              //  required: "Email Address is required!",
              // })}
              // error={errors.email ? errors.email.message : ""}
            />
            */}
            <input 
                placeholder="Email Address"
                type="email"
                name="email"
                label="Email Address"
                className="w-100 rounded"
                value={state.email}
                onChange={inputHandle}
            />
          </div>

          <div className="mb-3">
            {/* 
            <Textbox
              placeholder="Role"
              type="text"
              name="role"
              label="Role"
              className="w-100"
              // register={register("role", {
              //  required: "User role is required!",
              // })}
              // error={errors.role ? errors.role.message : ""}
            />
            */}
            <input 
                placeholder="Role"
                type="text"
                name="role"
                label="Role"
                className="w-100 rounded"
                value={state.role}
                onChange={inputHandle}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5 text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="d-flex justify-content-end gap-3">
              <Button type="submit" className="btn btn-primary px-4 fw-semibold" label="Submit" />

              <Button
                type="button"
                className="btn btn-light border px-4 fw-semibold"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUser;
