import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare, FaInstagramSquare, FaGithubSquare } from 'react-icons/fa';
import { ImLinkedin } from 'react-icons/im';


const Footer = () => {
  return (
    <div>
        {/* Footer */}
        <div className="footer mt-auto py-3 bg-body-tertiary" >
        <div className="container " >
            <footer className="d-flex flex-wrap justify-content-between 
                align-items-center py-3 my-4 border-top">

                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary 
                        text-decoration-none lh-1">
                        <Link to="/" >
                            Footer
                        </Link>   
                        <svg className="bi" width="30" height="24">
                            <use href="#bootstrap"/>
                        </svg>
                        <Link to="/" >
                            My Web App
                        </Link>
                    </a>
                    <span className="mb-3 mb-md-0 text-body-secondary">
                        &copy;  year  Company, Inc.
                    </span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            facebook
                        <span><FaFacebookSquare /> </span>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            twitter
                        <span><FaTwitterSquare /> </span>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            instagram
                        <span><FaInstagramSquare /> </span>    
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            youtube
                        <span><FaYoutubeSquare /> </span>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            github
                        <span><FaGithubSquare /> </span> 
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            linkedin
                        <span><ImLinkedin /> </span> 
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-body-secondary" href="#">
                            etc
                            ETC
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
        </div>
    </div>
  )
}

export default Footer