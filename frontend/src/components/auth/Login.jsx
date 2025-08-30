import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

import { user_login } from '../../store/actions/authAction';


const Login =  ({ history })  => {

    const dispath = useDispatch();
      
    const {loader, errorMessage, successMessage,
            authenticate } 
        = useSelector(state=>state.adminReducer);

    const [state, setState] = useState({
      email: '',
      password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
      if(authenticate){
        history.push('/dashboard');
      }
      // if(successMessage){
      //  history.push('/dashboard');
      // }
      if(errorMessage.error){
        toast.error(errorMessage.error);
        dispath({ type: 'ERROR_CLEAR' });
      }
    },[errorMessage?.error, authenticate]);

    useEffect(() => {
      dispath({ type: 'ERROR_CLEAR' });
    },[])

    const login = (e) => {
      e.preventDefault();
      dispath(user_login(state));
      history.push('/');
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

    <div className="container-fluid mb-4" >
      <div className="container" >
        <div className="col-12 text-center mt-5">
          <div className="text-center py-2">
            "Sign-In"
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center" >
        <div className="col-10 col-md-8 col-lg-6">
          <form className="row" >
            
            <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  
                  onChange={inputHandle}
                />
            </div>
            <p className="p-2 text-center text-danger" >
                { errorMessage?.email }
            </p>

            <div className="col-12 py-3">
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Password"
                name="password"
                
                onChange={inputHandle}
              />
            </div>
            <p className="p-2 text-center text-danger" >
                { errorMessage?.password }
            </p>
            
            <div className="col-12 py-3 text-center">

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
                  
                  onClick={login}
                >
                  "Sign-in"
                </button>
                
            }

               
            </div>
          </form>
          <div>
            <div className="text-center justify-content-center mt-2 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account ?&nbsp;
                <span
                  className="link-danger"
                  style={{ textDecoration: "none", cursor: "pointer" }} >
                  <Link to="/register" className="link-primary" >
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
            <div className="text-center justify-content-center mt-2 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Already have an account ?&nbsp;
                <span
                  className="link-danger"
                  style={{ textDecoration: "none", cursor: "pointer" }} >
                <Link to="/login" className="link-success" >
                  Sign In
                </Link>
                  
                </span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login