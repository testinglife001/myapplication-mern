import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_subtask, get_task } from '../../store/actions/Dashboard/taskAction';



const AddSubTask = ({history})  => {

    const dispatch = useDispatch();

    const {loader, taskSuccessMessage, allTask, taskError} 
            = useSelector(state=>state.dashboardTask);

    // console.log(allTask);

    const [state, setState] = useState({
        subtaskName: '',
        subtaskBody: '',
        task: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    // console.log(state);

    const addSubTask = (e) => {
        e.preventDefault();

        /*
         const { subtaskName, subtaskBody, task } = state;
        // console.log(state);
        const formData = new FormData();
        formData.append('subtaskName',subtaskName);
        formData.append('subtaskBody',subtaskBody);
        formData.append('task',task);

        dispatch(add_subtask(formData));
        */
       dispatch(add_subtask(state));
    }

    useEffect(() => {
        dispatch(get_task());
    },[]);

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
            <title>Add Sub Task</title>
        </Helmet>
        AddSubTask


        <div className="mt-4">
        <form onSubmit={addSubTask} >
        <div className="row">
            <div className="mb-3 col-md-11">
            <label for="subtaskTitle" className="form-label">Sub Task Title</label>
            <input type="text" id="subtaskName" className="form-control text-dark" placeholder="Sub Task Title" 
                name="subtaskName"
                value={state.subtaskName}
                onChange={inputHandle}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { taskError ? taskError.subtaskName : "" }
            </p>

            <div className="mb-3 col-md-9">
            <label className="form-label">Task</label>
            <select className="selectpicker form-control" data-width="100%"
                name="task" 
                    onChange={inputHandle}
                    value={state.task}
                     >
                <option value="">Choose Task</option>

                {
                    
                    allTask.length > 0 ?
                    allTask.map((t,index) => {
                        return (
                            <option key={index} value={t._id} >
                                {t.taskName} - {t.taskSlug} <br/>
                                {t._id}
                            </option>
                        )
                    })
                    :
                    '' 
                    
                }

            </select>
            </div>
            <p className="p-2 text-center text-danger" >
             { taskError ? taskError.task : "" }
            </p>
            
            <div className="mb-3 col-md-11">
            <label for="subtagDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="subtaskBody"
                    value={state.subtaskBody}
                    onChange={inputHandle}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
             { taskError ? taskError.subtaskBody : "" }
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
                "Add Sub Task"
                </button>
            }
            
        
        </div>

        </form>
        </div>


    </div>
  )
}

export default AddSubTask