import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_todo, get_jobs, get_todos } from '../../store/actions/Dashboard/todoAction';

const AddToDo = ({history}) => {

  const dispatch = useDispatch();

    const {loader, todoSuccessMessage, allJob, allToDos, todoError} 
            = useSelector(state=>state.dashboardToDo);

    // console.log(allToDos);
    // console.log(allJob);
    // console.log(allJob);
    // console.log(allToDos);

    const [state, setState] = useState({
        todoName: '',
        todoBody: '',
        job: '',
        todo: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    // console.log(state);

    const addToDo = (e) => {
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
       // dispatch(add_subtask(state));
       dispatch(add_todo(state));
    }

    useEffect(() => {
        dispatch(get_jobs());
        dispatch(get_todos());
    },[]);

    useEffect(() => {
      if(todoError && todoError.error){
          toast.error(todoError.error);
          dispatch({type: 'TODO_ERROR_MESSAGE_CLEAR'});
      }
      if(todoSuccessMessage){
          toast.success(todoSuccessMessage);
          dispatch({type: 'TODO_SUCCESS_MESSAGE_CLEAR'});
          history.push('/dashboard/all-todo');
      }
  }, [todoError, todoSuccessMessage]);

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
            <title>Add To Do</title>
      </Helmet>
      AddToDo

      
      <div className="mt-4">
        <form onSubmit={addToDo} >
        <div className="row">

          <div className="mb-3 col-md-9">
            <label className="form-label">Job</label>
            <select className="selectpicker form-control" data-width="100%"
                name="job" 
                    onChange={inputHandle}
                    value={state.job}
                     >
                <option value="">Choose Job</option>

                {
                    
                    allJob.length > 0 ?
                    allJob.map((j,index) => {
                        return (
                            <option key={index} value={j._id} >
                                {j.jobName} - {j.jobSlug} <br/>
                                {j._id}
                            </option>
                        )
                    })
                    :
                    '' 
                    
                }

            </select>
            </div>

            <div className="mb-3 col-md-11">
            <label for="todoTitle" className="form-label">To Do Title</label>
            <input type="text" id="todoName" className="form-control text-dark" placeholder="Sub Task Title" 
                name="todoName"
                value={state.todoName}
                onChange={inputHandle}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { todoError ? todoError.todoName : "" }
            </p>

            <div className="mb-3 col-md-9">
            <label className="form-label">To Do List</label>
            <select className="selectpicker form-control" data-width="100%"
                name="todo" 
                     onChange={inputHandle}
                     value={state.todo}
                     >
                <option value="">Choose ToDo</option>

                {
                     
                    allToDos.length > 0 ?
                    allToDos.map((t,index) => {
                        return (
                            <option key={index} value={t._id} >
                                {t.todoName} - {t.todoSlug} <br/>
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
             { /*taskError ? taskError.task : ""*/ }
            </p>
            
            <div className="mb-3 col-md-11">
            <label for="todoDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="todoBody"
                    value={state.todoBody}
                    onChange={inputHandle}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
             { todoError ? todoError.todoBody : "" }
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
                "Add To Do"
                </button>
            }
            
        
        </div>

        </form>
        </div>

    </div>
  )
}

export default AddToDo