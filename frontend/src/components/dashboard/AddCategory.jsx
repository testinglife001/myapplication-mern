import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_category } from '../../store/actions/Dashboard/categoryAction';

const AddCategory = ({history}) => {

    const dispatch = useDispatch();
    const {loader, categoryError, categorySuccessMessage} 
            = useSelector(state=>state.dashboardCategory);
    // console.log(loader);

    const [state, setState] = useState({
        categoryName: '',
        categoryBody: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    // console.log(loader);
    
    const addCategory = (e) => {
        e.preventDefault();
        // console.log(state);
        dispatch(add_category(state));
    }

    useEffect(() => {
        if(categoryError && categoryError.error){
            toast.error(categoryError.error);
            dispatch({type: 'CATEGORY_ERROR_MESSAGE_CLEAR'});
        }
        if(categorySuccessMessage){
            toast.success(categorySuccessMessage);
            dispatch({type: 'CATEGORY_SUCCESS_MESSAGE_CLEAR'});
            history.push('/dashboard/all-category');
        }
    }, [categoryError, categorySuccessMessage]);

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
            <title>Add Category</title>
        </Helmet>
        AddCategory
        <div className="mt-4">
        <form onSubmit={addCategory} >

        <div className="row px-5">
            <div className="mb-3 col-md-11">
            <label for="categoryTitle" className="form-label">Title</label>
            <input type="text" id="categoryTitle" className="form-control text-dark" placeholder="Category Title" 
                name="categoryName"
                onChange={inputHandle}
                value={state.categoryName}
                />
            <small>Keep your post titles under 60 characters. Write
                heading that describe the topic content.
                Contextualize for Your Audience.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { categoryError ? categoryError.categoryName : "" }
            </p>
            
            <div className="mb-3 col-md-11">
            <label for="categoryDescription" className="form-label">Description</label>
            <textarea rows="3" id="Excerpt" className="form-control text-dark"
                    placeholder="Excerpt"
                    name="categoryBody"
                    onChange={inputHandle}
                    value={state.categoryBody}
                    ></textarea>
            <small>A short extract from writing.</small>
            </div>
            <p className="p-2 text-center text-danger" >
                { categoryError ? categoryError.categoryBody : "" }
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
                "Add Category"
                </button>
            }          
        
        </div>

        </form>
        </div>
    </div>
  )
}

export default AddCategory