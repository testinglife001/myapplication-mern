import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, getAllTask, upddateTasks } from '../../store/actions/Dashboard/taskAction';
import toast, {Toaster} from 'react-hot-toast';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload
} from 'react-icons/io';

const AllSubTask = () => {

  const dispatch = useDispatch();
  const { taskSuccessMessage, allTask, taskList, taskError} = useSelector(state=>state.dashboardTask);
  // console.log(taskList);
  // console.log(allTask);

  const [taskName,setTaskName] = useState('');
  const [parentId,setParentId] = useState('');
  const [show, setShow] = useState(false);
  const [checked,setChecked] = useState([]);
  const [expanded,setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);

  const handleClose = () => {

    const form = new FormData();
     const task = {
      taskName,
      parentId
     }
    // console.log(task);
    // form.append('taskName', taskName);
    // form.append('parentId', parentTaskId);
    // dispatch(addTask(form));
     dispatch(addTask(task));
     setTaskName('');
     setParentId('');
    setShow(false);
  }
  const handleShow = () => setShow(true);
  useEffect(() => {
    // console.log(taskList);
    dispatch(getAllTask());
  },[]);
  useEffect(() => {
    if(taskSuccessMessage){
        toast.success(taskSuccessMessage);
        dispatch({type: 'TASK_SUCCESS_MESSAGE_CLEAR'});
    }
    // dispatch(get_all_task(currentPage ? currentPage.toString().split('-')[1] : 1));
  }, [ /*currentPage*/ , taskSuccessMessage]);
  const createTaskList = (taskList,options=[]) => {
    for (let task of taskList) {
      options.push({
        value: task._id,
        taskName: task.taskName,
        parentId: task.parentId
      });
      if(task.children.length > 0){
        createTaskList(task.children,options)
      }
    }
    return options;
  }
  const renderTasks = (taskList) => {
    let tasks = [];
    for(let task of taskList){
      tasks.push(
        {
          label: task.taskName,
          value: task._id,
          children: task.children.length > 0 && renderTasks(task.children)
        }
      );
    }
    return tasks;
  }
  const renderTaskList = (taskList) => {
    let tasks = [];
    for(let task of taskList){
      tasks.push(
        <li key={task._id} >

          {task.taskName}
          {
            task.children.length > 0 ? (
              <ul className="list-unstyled px-5" >
                {
                  renderTaskList(task.children)
                }
              </ul>  
            )
            :
            null
          }
        </li>
      );
    }
    return tasks;
  }
  const updateTask = () => {
    setUpdateTaskModal(true);
    const tasks = createTaskList(taskList);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((taskId,index) => {
      const task =tasks.find((task,_index) => taskId == task.value);
      task && checkedArray.push(task);
    })
    expanded.length > 0 && expanded.forEach((taskId,index) => {
      const task =tasks.find((task,_index) => taskId == task.value);
      task && expandedArray.push(task);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({checked,expanded,tasks,checkedArray,expandedArray});
  }
  const handleTaskInput = (key, value, index, type) => {
    console.log(value);
    if (type == "checked") {
        const updatedCheckedArray = checkedArray.map((item, _index) =>
            index == _index ? { ...item, [key]: value } : item);
        setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
        const updatedExpandedArray = expandedArray.map((item, _index) =>
            index == _index ? { ...item, [key]: value } : item);
        setExpandedArray(updatedExpandedArray);
    }
  }
  const updateTasksForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
        form.append('_id', item.value);
        form.append('taskName', item.taskName);
        form.append('parentId', item.parentId ? item.parentId : "");
        form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
        form.append('_id', item.value);
        form.append('taskName', item.taskName);
        form.append('parentId', item.parentId ? item.parentId : "");
        form.append('type', item.type);
    });
    console.log(form);
    // dispatch(updateCategories(form));
    // dispatch(upddateTasks(form));
    
}


  return (
    <div>
        <Toaster position={'bottom-center'} 
            reverseOrder={false}
            toastOptions={
                {
                    style: {
                        fontSize: '15px'
                    }
                }
            }
        />
        

        <Helmet>
            <title>All Task AllSubTask</title>
        </Helmet>
        
        <br/>

        AllSubTask
        AllTask
        All Tasks (  )
        <div>
        <div className="Task mb-4 ">
                            
            <div className="Task-header border-bottom-0">
                
                <form className="d-flex align-items-center ">
                    <span className="position-absolute ps-3 search-icon">
                    <i className="fe fe-search"></i>
                    </span>
                    <input  className="form-control ps-6" 
                            placeholder="Search Task" 
                            type="text"  />
                </form>

                

                <button className="btn btn-secondary "  id="dropdownMenuButton1">
                    Notification
                </button>
                &nbsp;
                {/*<!-- Button trigger modal 
                <button type="button" className="btn btn-primary"   
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    variant="primary" onClick={handleShow}    >
                  Add Create Task
                </button>
                -->*/}
                &nbsp;
                {/*<!-- Button trigger modal 
                <button type="button" className="btn btn-primary"   
                    data-bs-toggle="modal" data-bs-target="#exampleUpdateModal"
                    variant="primary" onClick={updateTask}    >
                  Edit Update Task
                </button>
                -->*/}
                &nbsp;
                <button className="btn btn-danger"  id="dropdownMenuButton1">
                <Link to="/dashboard/all-subtask" className="dropdown-item">
                    All Sub Task
                </Link>
                </button>
                &nbsp;
                <button className="btn btn-success"  id="dropdownMenuButton1">
                <Link to="/dashboard/add-subtask" className="dropdown-item">
                    Add Sub Task
                </Link>
                </button>

            </div>

            <br/><br/>
                            
            <div className="table-responsive border-0 overflow-y-hidden">

               <ul className="list-unstyled px-5" >
                { renderTaskList(taskList) }
              </ul>

              {/*
              <ul className="list-unstyled px-5" >
                { renderTaskList(taskList) }
                {
                  // JSON.stringify(createTaskList(taskList))
                }
              </ul>
              */}

              <br/><br/>
              <hr/>
              <br/><br/>
              

              <CheckboxTree
                nodes={renderTasks(taskList)}
                checked={checked}
                expanded={expanded}
                // onCheck={checked => setChecked({ checked })}
                // onExpand={expanded => setExpanded({ expanded })}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                  check: <IoIosCheckbox/> ,
                  uncheck: <IoIosCheckboxOutline/>,
                  halfCheck: <IoIosCheckboxOutline/>,
                  expandClose: <IoIosArrowForward/>,
                  expandOpen: <IoIosArrowDown/>,
                }}
              />

            </div>

            <br/><br/>
            <hr/>
            <br/><br/>
            <br/><br/>
            
            {/* 
            <div className="modal fade" id="exampleModal" tabindex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true" 
                show={show}  // handleClose={handleClose} 
                handleClose={() => setShow(false)}  >
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Task</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                  <div className="modal-body" >
                  <form onSubmit={handleClose} >

                    <div className="mb-3 col-md-11">
                      <label for="taskTitle" className="form-label"> Task Title</label>
                      <input type="text" id="taskName" className="form-control text-dark" 
                          placeholder=" Task Title" 
                          name="taskName"
                          value={taskName}
                          onChange={(e)=>setTaskName(e.target.value)}
                          />
                      <small>Keep your post titles under 60 characters. Write
                          heading that describe the topic content.
                          Contextualize for Your Audience.</small>
                    </div>
                      <p className="p-2 text-danger"  >
                         Error
                      </p>
                    
                    <div className="mb-3 col-md-9">
                      <label className="form-label">Task </label>
                      <select className="selectpicker form-control" data-width="100%"
                          name="parentId" value={parentId} 
                          onChange={(e)=>setParentId(e.target.value)}  >

                          <option value="">Choose Task</option>

                          {
                            createTaskList(taskList).map((option) => 
                              <option key={option.value} value={option.value} >
                                {option.taskName}
                              </option>
                            )
                          }

                      </select>
                    </div>
                      <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                        >
                        Error
                      </p>
                  
                      <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                          variant="secondary" onClick={handleClose}  >Close</button>
                      <button type="button" className="btn btn-primary"
                          variant="primary" 
                           onClick={handleClose}  
                          >
                            Save changes
                      </button>
                      </div>
                  </form>
                  
                 
                  
                  
                  </div>

                </div>
              </div>
            </div>
            */}


            {/* Edit Update TASK 
            <div className="modal fade" id="exampleUpdateModal" tabindex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true" 
                show={updateTaskModal} // handleClose={updateTask} 
                handleClose={() => setUpdateTaskModal(false)}  >
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Edit Task</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                  <div className="modal-body" >
                  <form onSubmit={updateTasksForm} >

                                     
                    <div className="row" >
                    <div className="mb-3 col-md-11">
                      <h6>Expanded Tasks</h6>
                    </div>
                    </div>

                    {
                      expandedArray.length > 0 && 
                      expandedArray.map((item,index) =>
                      
                      <div className="row" key={index} >

                        <div className="mb-3 col-md-11">
                          <label for="taskTitle" className="form-label"> Task Title</label>
                          <input type="text" id="taskName" className="form-control text-dark" 
                              placeholder=" Task Title" 
                              name="taskName"
                              value={item.taskName}
                              // onChange={(e)=>setTaskName(e.target.value)}
                              onChange={(e) => handleTaskInput('taskName', e.target.value, index, 'expanded')}
                              />
                          <small>Keep your post titles under 60 characters. Write
                              heading that describe the topic content.
                              Contextualize for Your Audience.</small>
                        </div>
                        <p className="p-2 text-danger"  >
                          Error
                        </p>
                      
                        <div className="mb-3 col-md-9">
                          <label className="form-label">Task </label>
                          <select className="selectpicker form-control" data-width="100%"
                              name="parentId" value={item.parentId} 
                              //onChange={(e)=>setParentId(e.target.value)}  
                              onChange={(e) => handleTaskInput('parentId', e.target.value, index, 'expanded')}
                              >

                              <option value="">Choose Task</option>

                              {
                                createTaskList(taskList).map((option) => 
                                  <option key={option.value} value={option.value} >
                                    {option.taskName}
                                  </option>
                                )
                              }

                          </select>
                        </div>
                        <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                          >
                          Error
                        </p>
                    
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            variant="secondary" onClick={handleClose}  >Close</button>
                        <button type="button" className="btn btn-primary"
                            variant="primary" 
                            onClick={handleClose}  
                            >
                              Save changes
                        </button>
                        </div>

                      </div>
                      
                      )
                    }

                    <br/>
                    <hr/>
                    <br/>

                    <div className="row" >
                    <div className="mb-3 col-md-11">
                      <h6>Checked Tasks</h6>
                    </div>
                    </div>


                    {
                      checkedArray.length > 0 && 
                      checkedArray.map((item,index) =>
                      
                      <div className="row" key={index} >

                        <div className="mb-3 col-md-11">
                          <label for="taskTitle" className="form-label"> Task Title</label>
                          <input type="text" id="taskName" className="form-control text-dark" 
                              placeholder=" Task Title" 
                              name="taskName"
                              value={item.taskName}
                              // onChange={(e)=>setTaskName(e.target.value)}
                              onChange={(e) => handleTaskInput('taskName', e.target.value, index, 'checked')}
                              />
                          <small>Keep your post titles under 60 characters. Write
                              heading that describe the topic content.
                              Contextualize for Your Audience.</small>
                        </div>
                        <p className="p-2 text-danger"  >
                          Error
                        </p>
                      
                        <div className="mb-3 col-md-9">
                          <label className="form-label">Task </label>
                          <select className="selectpicker form-control" data-width="100%"
                              name="parentId" value={item.parentId} 
                              //onChange={(e)=>setParentId(e.target.value)}  
                              onChange={(e) => handleTaskInput('parentId', e.target.value, index, 'checked')}
                              >

                              <option value="">Choose Task</option>

                              {
                                createTaskList(taskList).map((option) => 
                                  <option key={option.value} value={option.value} >
                                    {option.taskName}
                                  </option>
                                )
                              }

                          </select>
                        </div>
                        <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                          >
                          Error
                        </p>
                    
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            variant="secondary" onClick={handleClose}  >Close</button>
                        <button type="button" className="btn btn-primary"
                            variant="primary" 
                            onClick={handleClose}  
                            >
                              Save changes
                        </button>
                        </div>

                      </div>
                      
                      )
                    }

                    <br/>
                    <hr/>
                    <br/>


                  </form>                 
                  
                  </div>

                </div>
              </div>
            </div>
            */}
            
        </div>
        </div>
    </div>
  )
}

export default AllSubTask