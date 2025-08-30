import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_tag } from '../../store/actions/Dashboard/tagAction';

const AddTag = ({history}) => {

    const dispatch = useDispatch();
    const {loader, tagError, tagSuccessMessage} 
            = useSelector(state=>state.dashboardTag);
    
    const [state, setState] = useState({
        tagName: '',
        tagBody: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const addTag = (e) => {
        e.preventDefault();
        // console.log(state);
        // dispatch(add_tag(state));
        dispatch(add_tag(state));

    }

    useEffect(() => {
        if(tagError && tagError.error){
            toast.error(tagError.error);
            dispatch({type: 'TAG_ERROR_MESSAGE_CLEAR'});
        }
        if(tagSuccessMessage){
            toast.success(tagSuccessMessage);
            dispatch({type: 'TAG_SUCCESS_MESSAGE_CLEAR'});
            history.push('/dashboard/all-tag');
        }
    }, [tagError, tagSuccessMessage]);

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
            <title>Add Tag</title>
        </Helmet>
        AddTag
        <div className="mt-4">
        <form onSubmit={addTag} >
        <div className="row">
            <div className="mb-3 col-md-11">
            <label for="tagTitle" className="form-label">Title</label>
            <input type="text" id="tagTitle" className="form-control text-dark" placeholder="Tag Title" 
                name="tagName"
                value={state.tagName}
                onChange={inputHandle}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { tagError ? tagError.tagName : "" }
            </p>
            
            <div className="mb-3 col-md-11">
            <label for="tagDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="tagBody"
                    value={state.tagBody}
                    onChange={inputHandle}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { tagError ? tagError.tagBody : "" }
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
                "Add Tag"
                </button>
            }          
        
        </div>

        </form>
        </div>
    </div>
  )
}

export default AddTag