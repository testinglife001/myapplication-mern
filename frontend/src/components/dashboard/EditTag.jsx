import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { edit_tag, update_tag } from '../../store/actions/Dashboard/tagAction';

const EditTag = ({history}) => {

    const dispatch = useDispatch();
    const {tagSlug} = useParams();
    // console.log(tagSlug);

    const {loader, tagError, tagSuccessMessage, editTag, editRequest} 
            = useSelector(state=>state.dashboardTag);
            
    const [state, setState] = useState({
        tagName: '',
        tagBody: ''
    })

    useEffect(() => {
        if(editRequest){
            setState({
                tagName: editTag.tagName,
                tagBody: editTag.tagBody
            });
            dispatch({
                type: 'EDIT_REQUEST_CLEAR'
            })
        } else {
            dispatch(edit_tag(tagSlug));
        }
    },[editTag, tagSlug]);

    useEffect(() => {
        if(tagSuccessMessage){
            history.push('/dashboard/all-tag');
        }
    },[tagSuccessMessage]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const updateTag = (e) => {
        e.preventDefault();
        // console.log(state);
         dispatch(update_tag(editTag._id, state));
    }


  return (
    <div>
        <Helmet>
            <title>Edit Tag</title>
        </Helmet>
        Edit Tag

        <div className="mt-4">
        <form onSubmit={updateTag} >
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
                { tagError && tagError.tagName }
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
                { tagError && tagError.tagBody }
            </p>
                   
        </div>

        <div className="mb-3 col-md-11 text-center ">

            <button
            className="btn btn-primary"
            type="submit"
            >
            "Update Tag"
            </button>          
        
        </div>

        </form>
        </div>

    </div>
  )
}

export default EditTag