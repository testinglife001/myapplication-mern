import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { edit_category, update_category } from '../../store/actions/Dashboard/categoryAction';

const EditCategory = ({history}) => {

    const dispatch = useDispatch();
    const {categorySlug} = useParams();
    // console.log(categorySlug);

    const {loader, categoryError, categorySuccessMessage, editCategory, editRequest} 
            = useSelector(state=>state.dashboardCategory);

    const [state, setState] = useState({
        categoryName: '',
        categoryBody: ''
    })

    useEffect(() => {
        if(editRequest){
            setState({
                categoryName: editCategory.categoryName,
                categoryBody: editCategory.categoryBody
            });
            dispatch({
                type: 'EDIT_REQUEST_CLEAR'
            })
        } else {
            dispatch(edit_category(categorySlug));
        }
    },[editCategory, categorySlug]);

    useEffect(() => {
        if(categorySuccessMessage){
            history.push('/dashboard/all-category');
        }
    },[categorySuccessMessage]);  

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const updateCategory = (e) => {
        e.preventDefault();
        // console.log(state);
         dispatch(update_category(editCategory._id, state));
    }

  return (
    
    <div>

        <Helmet>
            <title>Edit Category</title>
        </Helmet>
        Edit Category

        <div className="mt-4">
        <form onSubmit={updateCategory} >
        <div className="row">
            <div className="mb-3 col-md-9">
            <label for="categoryTitle" className="form-label">Title</label>
            <input type="text" id="categoryTitle" className="form-control text-dark" placeholder="Category Title" 
                    name="categoryName"
                    value={state.categoryName}
                    onChange={inputHandle}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { categoryError && categoryError.categoryName }
            </p>
            
            <div className="mb-3 col-md-9">
            <label for="categoryDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="categoryBody"
                    value={state.categoryBody}
                    onChange={inputHandle}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { categoryError && categoryError.categoryBody }
            </p>
            
            
        </div>
        <div className="mb-3 col-md-9 text-center ">                               

                <button
                className="btn btn-primary"
                type="submit"
                >
                "Update Category"
                </button>           
        
        </div>
        </form>
        </div>
    </div>

  )
}

export default EditCategory