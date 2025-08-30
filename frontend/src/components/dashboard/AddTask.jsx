import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_task } from '../../store/actions/Dashboard/taskAction';


const AddTask = ({history}) => {

    const dispatch = useDispatch();
    const {loader, taskError, taskSuccessMessage} 
            = useSelector(state=>state.dashboardTask);
    
    const [state, setState] = useState({
        taskName: '',
        taskBody: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const addTask = (e) => {
        e.preventDefault();
        // console.log(state);
        // dispatch(add_tag(state));
        dispatch(add_task(state));

    }

    useEffect(() => {
        if(taskError && taskError.error){
            toast.error(taskError.error);
            dispatch({type: 'TASK_ERROR_MESSAGE_CLEAR'});
        }
        if(taskSuccessMessage){
            toast.success(taskSuccessMessage);
            dispatch({type: 'TASK_SUCCESS_MESSAGE_CLEAR'});
            history.push('/dashboard/all-task');
        }
    }, [taskError, taskSuccessMessage]);

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
            <title>Add Task</title>
        </Helmet>
        AddTask

        <div className="mt-4">
        <form onSubmit={addTask} >
        <div className="row">
            <div className="mb-3 col-md-11">
            <label for="taskTitle" className="form-label">Task Title</label>
            <input type="text" id="taskName" className="form-control text-dark" placeholder="Task Title" 
                name="taskName"
                value={state.taskName}
                onChange={inputHandle}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                 { taskError ? taskError.taskName : "" }
            </p>
            
            <div className="mb-3 col-md-11">
            <label for="tagDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="taskBody"
                    value={state.taskBody}
                    onChange={inputHandle}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { taskError ? taskError.taskBody : "" }
            </p>
            
            
        </div>

        <div className="mb-3 col-md-11 text-center ">

            {
                loader ? 
                <div>

                    <div className="text-center">
                    <div className="spinner-border m-5 " role="status">
                    </div>
                    <h4 className="text-center">
                        Please Wait ...
                    </h4>
                    <br/>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-grow text-primary"
                            role="status">
                        </div>
                        <span className='px-4' >
                            <h5>Processing</h5>
                        </span>
                        <div className="spinner-grow text-primary"
                            role="status">
                        </div>
                    </div>
                    <br/>
                    <br/>
                    
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                    </div>
                    
                </div>

                : 

                <button
                className="btn btn-primary"
                type="submit"
                >
                "Add Task"
                </button>
            }          
        
        </div>

        </form>
        </div>

    </div>
  )
}

export default AddTask