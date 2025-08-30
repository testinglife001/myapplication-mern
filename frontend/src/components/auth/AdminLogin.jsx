// src/components/auth/AdminLogin.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { admin_login } from '../../store/actions/authAction';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loader, errorMessage, successMessage, authenticate } = useSelector(state => state.adminReducer);

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const submitLogin = (e) => {
        e.preventDefault();
        dispatch(admin_login(state));
    };

    useEffect(() => {
        console.log('authenticate:', authenticate);
        console.log('successMessage:', successMessage);
        console.log('errorMessage:', errorMessage);

        if (authenticate) {
            history.push('/dashboard');
        }

        if (successMessage) {
            toast.success(successMessage);
            dispatch({ type: 'LOGIN_SUCCESS_MESSAGE_CLEAR' });
        }
    }, [authenticate, successMessage, dispatch, history]);

    useEffect(() => {
        if (errorMessage?.email) {
            toast.error(errorMessage.email);
        }
        if (errorMessage?.password) {
            toast.error(errorMessage.password);
        }
        if (errorMessage?.error) {
            toast.error(errorMessage.error);
        }
        dispatch({ type: 'LOGIN_ERROR_CLEAR' });
    }, [errorMessage, dispatch]);

    return (
        <div className="container-fluid mb-4">
            <div className="container">
                <div className="col-12 text-center mt-3">
                    <Toaster position={'bottom-center'} reverseOrder={false} />
                    <h2 className="p-5 text-center">
                        <span className="badge bg-danger">Admin Login</span>
                    </h2>
                </div>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form onSubmit={submitLogin}>
                            <div className="col-12 py-3">
                                <input
                                    type="email"
                                    className="form-control input-text-box"
                                    placeholder="Email"
                                    name="email"
                                    onChange={inputHandle}
                                    value={state.email}
                                />
                            </div>
                            <div className="col-12 py-3">
                                <input
                                    type="password"
                                    className="form-control input-text-box"
                                    placeholder="Password"
                                    name="password"
                                    onChange={inputHandle}
                                    value={state.password}
                                />
                            </div>
                            <div className="col-12 text-center">
                                {loader ? (
                                    <div>
                                        <div className="spinner-border m-5" role="status" />
                                        <h4>Please Wait ...</h4>
                                        <div className="d-flex justify-content-center mt-3">
                                            <div className="spinner-grow text-primary mx-2" role="status" />
                                            <h5>Processing</h5>
                                            <div className="spinner-grow text-primary mx-2" role="status" />
                                        </div>
                                    </div>
                                ) : (
                                    <button className="btn btn-primary" type="submit">
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

