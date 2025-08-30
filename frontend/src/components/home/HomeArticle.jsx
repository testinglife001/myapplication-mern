import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import Pagination from '../home/Pagination';
import { get_all_article } from '../../store/actions/home/homeAction';


const HomeArticle = () => {

    const { currentPage } = useParams();
    // console.log(currentPage);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_all_article(currentPage ? currentPage.toString().split('-')[1] : 1, ""));
    }, [currentPage]);

  return (
    <>

    <div>
        <div className="mb-5" >
            <span className="badge bg-secondary" >
            <h3>Article Section</h3>
            </span>
            <br />
        </div>

        <div className="container" >
        <div className="row border-bottom" >

            <div className="col-md-5">
                <div className="text-center" >
                    <div className="rounded">
                        <h5>image</h5>
                        <img alt="" className="img-fluid img-thumbnail"
                            src="http://localhost:3000/articalImage/pp-img.jpg" 
                            />
                        <div>category name</div>
                    </div>
                </div>
            </div>

            <div className="col-md-7 ">
                <div className="text-start ">
                    <h6 className="text-center" >category</h6>
                    <span className="px-4 py-5 fw-bold mb-0 fs-4">
                        <b>title</b>
                    </span>
                    <span className="px-4 mb-3 bg-body-tertiary rounded">
                    <p className="bg-light">author</p> -&nbsp;
                     10th Nov, 2024.
                    </span>
                </div>
                <div className="p-4 mb-3 text-start">
                    description
                </div>
                <Link to="" >
                    <button className="btn btn-primary">Read More</button>
                </Link>
                
                <div className="p-3 d-flex align-items-start" style={{ float: "right" }}>
                    <div >
                        ( "x" )
                    </div>
                    
                    <div >
                        ( "*" )
                    </div>             
                </div>             
            </div>

        </div>
        </div>
    </div>

    {/* Pagination */}
    <Pagination />

    </>
  )
}

export default HomeArticle