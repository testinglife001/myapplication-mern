import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_job } from '../../store/actions/Dashboard/jobAction';

const AddJob = ({history})  => {

  const dispatch = useDispatch();
    const {loader, jobError, jobSuccessMessage} 
            = useSelector(state=>state.dashboardJob);
    
    const [state, setState] = useState({
        jobName: '',
        jobBody: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const addJob = (e) => {
        e.preventDefault();
        // console.log(state);
        // dispatch(add_tag(state));
        // dispatch(add_task(state));
        dispatch(add_job(state));
    }

    useEffect(() => {
        if(jobError && jobError.error){
            toast.error(jobError.error);
            dispatch({type: 'JOB_ERROR_MESSAGE_CLEAR'});
        }
        if(jobSuccessMessage){
            toast.success(jobSuccessMessage);
            dispatch({type: 'JOB_SUCCESS_MESSAGE_CLEAR'});
            history.push('/dashboard/all-job');
        }
      }, [jobError, jobSuccessMessage]);


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
            <title>Add Job</title>
      </Helmet>
      AddJob

      <div className="mt-4">
        <form onSubmit={addJob} >
        <div className="row">
            <div className="mb-3 col-md-11">
            <label for="jobName" className="form-label">Job Title</label>
            <input type="text" id="jobName" className="form-control text-dark" placeholder="Job Title" 
                name="jobName"
                value={state.jobName}
                onChange={inputHandle}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                 { jobError ? jobError.jobName : "" }
            </p>
            
            <div className="mb-3 col-md-11">
            <label for="jobDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="jobBody"
                    value={state.jobBody}
                    onChange={inputHandle}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { jobError ? jobError.jobBody : "" }
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
                "Add Job"
                </button>
            }          
        
        </div>

        </form>
        </div>


    </div>
  )
}

export default AddJob