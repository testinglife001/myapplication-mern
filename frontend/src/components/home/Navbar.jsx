import React, { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { user_logout } from '../../store/actions/authAction';

const Navbar = () => {

    const {userInfo} = useSelector(state => state.adminReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch(user_logout({ role:userInfo.role, history }));
    }

  return (
    <div>
        {/* Navbar */}
        <div className="" >
        <nav className="navbar navbar-expand-lg navbar-dark  bg-body-tertiary fixed-top" 
            data-bs-theme="dark" >
            <div className="container-fluid">
                <div className="navbar-brand" href="#">
                    <span className="badge bg-light text-dark fs-4" >
                    <Link to="/" className="nav-link" >
                        MyWebApp
                    </Link>
                    </span>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div    
                            >
                                <Link to="/" className="nav-link" >
                                    Home
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown  ">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                
                                <button type="button" className="btn btn-sm btn-outline-danger">
                                <small>
                                    MyApps
                                    &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-arrow-down" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"/>
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z"/>
                                    </svg>
                                    <span className="visually-hidden">Button</span>
                                </small>
                                </button>

                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        ToDo List
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-item" >
                                        <Link to="/task-manager" className="nav-link" >
                                        Task Manager
                                        </Link>
                                    </div>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Trello
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <div 
                            >
                                <Link to="/" className="nav-link" >
                                    About Us
                                </Link>                             
                            </div>
                        </li>

                        {/* 
                        <li className="nav-item">
                            <div  
                            >
                                <Link to="/" className="nav-link" >
                                        Privacy Policy
                                </Link>   
                            </div>
                        </li>
                        */}
                        

                        <li className="nav-item">
                            <div  
                            >
                                <Link to="/" className="nav-link" >
                                    Contact Us
                                </Link>                             
                            </div>
                        </li>

                        {/* 
                        <li className="nav-item">
                            <div className="nav-link" 
                            
                            >
                                <Link to="/" >
                                    NavItem 01
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item " >
                            <div className="nav-link" 
                            
                            >
                                <Link to="/" >
                                    NavItem 02
                                </Link>
                            </div>
                        </li>
                        */}
                        


                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" 
                            aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    

                    {
                        userInfo ? (
                            <ul className="nav" >

                                <li className="nav-item" ><a className="nav-link" href="#">{userInfo.name}</a></li>
                                
                                <li className="nav-item" ><hr className="dropdown-divider" /></li>
                                <li className="nav-item" 
                                    onClick={logout} >
                                    <a className="nav-link" href="#">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="nav" >
                            <li className="nav-item">
                                <a className="nav-link" href="#">@</a>
                            </li>
                            <li className="nav-item">
                                <div 
                                >
                                    <Link to="/login" className="nav-link link-body-emphasis px-2 btn btn-sm 
                                    btn-outline-secondary" >
                                        Login
                                    </Link>                             
                                </div>
                            </li>
                            <li className="nav-item">
                                <div 
                                >
                                    <Link to="/register" className="nav-link link-body-emphasis px-2 btn btn-sm 
                                    btn-outline-secondary" >
                                        Register
                                    </Link>                             
                                </div>
                            </li>
                            
                            </ul>
                        )
                    }

                    
                </div>
            </div>
        </nav>
        </div>

    </div>
  )
}

export default Navbar