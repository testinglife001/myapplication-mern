import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { register, user_register } from '../../store/actions/authAction';
import axios from "axios";

const Register = ({ history }) => {

    const dispath = useDispatch();
    
    const {loader, errorMessage, successMessage,
            authenticate } 
        = useSelector(state=>state.adminReducer);

    const [state, setState] = useState({
      name: '',
      email: '',
      password: '',
      image: ''
    })

    const [showImage, setShowImage] = useState("");

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const imageHandle = (e) => {
      if(e.target.files.length !== 0){
          setState({
            ...state,
            image: e.target.files[0]
          })

          const render = new FileReader();
          render.onload = () => {
            setShowImage(render.result);
          }
          render.readAsDataURL(e.target.files[0]);

      }  
    }

    const upload = async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "myapplication");

      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dvnxusfy8/image/upload", data);
        const { url } = res.data;
        return url;
      } catch (err) {
        console.log(err);
      }
    } 

    // console.log(showImage);

    const userRegister =  (e) => {
        e.preventDefault();
        const url = upload(file)
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('email', state.email);
        formData.append('password', state.password);
        formData.append('image', state.image);

        // dispath(register(formData));
        dispath(user_register(formData));
    }
    // console.log(history);

    useEffect(() => {
        if (successMessage) {
        toast.success(successMessage);
        history.push('/verify'); // v5 navigation
        }
        if (errorMessage) {
        toast.error(errorMessage);
        dispath({ type: 'ERROR_CLEAR' });
        }
    }, [successMessage, errorMessage]);

    useEffect(() => {
        dispath({ type: 'ERROR_CLEAR' });
    }, []);

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
            "Sign-Up"
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center" >
        <div className="col-10 col-md-8 col-lg-6">
          <form className="row" encType="multipart/form-data"   method="post" >
            
            <div className="col-12 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="User Name"
                name="name"
                value={state.name}
                onChange={inputHandle}
              />
            </div>
            <p className="p-2 text-center text-danger" >
                { errorMessage?.name }
            </p>


            <div className="col-12 py-3">
              <input
                type="email"
                className="form-control input-text-box"
                placeholder="Email"
                name="email"
                value={state.email}
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
                value={state.password}
                onChange={inputHandle}
              />
            </div>
            <p className="p-2 text-center text-danger" >
                { errorMessage?.password }
            </p>



            <div className="col-12 py-3 text-center">
              {
                showImage && <img src={`${showImage}`} alt="Profile Image" width="150" />
              }
              <br/>
              { state.image && state.image.name }
            </div>

            <div className="col-12 py-3">
              <input
                className="form-control input-text-box"
                type="file"
                name="image"
                onChange={imageHandle}
              />
            </div>
            <p className="p-2 text-center text-danger" >
                { errorMessage?.image }
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
                  type="submit"
                  onClick={userRegister}
                >
                  "Sign-up"
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

export default Register