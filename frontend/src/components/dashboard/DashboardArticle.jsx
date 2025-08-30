import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import Pagination from './Pagination';
import { get_all_article } from '../../store/actions/Dashboard/articleAction';




const DashboardArticle = ({history}) => {

    const dispatch = useDispatch();
    const {currentPage} = useParams();

    const { allArticle, perPage, articleCount, loader, articleError, articleSuccessMessage } = useSelector(state=>state.dashboardArticle);

    // console.log(allArticle);

    useEffect(() => {
        dispatch(get_all_article(currentPage ? currentPage.toString().split('-')[1] : 1, ""));
    },[currentPage])

    useEffect(()=> {

        if(articleSuccessMessage){
             toast.success(articleSuccessMessage)
            dispatch({
                type: 'ARTICLE_SUCCESS_MESSAGE_CLEAR'
            })
            history.push('/dashboard/all-article');
        }

    },[articleSuccessMessage])

  return (
    <div >
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
            <title>All Article</title>
        </Helmet>
        Dashboard Article
        <div className="Task ">  
            <h5 className="Task-header">All Articles</h5>
            <div className="Task-header border-bottom-0">
                
                <form className="d-flex align-items-center ">
                    <span className="position-absolute ps-3 search-icon">
                    <i className="fe fe-search"></i>
                    </span>
                    <input  className="form-control ps-6" 
                            placeholder="Search Article" 
                            type="text"
                            onChange={(e) =>dispatch(get_all_article(currentPage ? 
                                currentPage.toString().split('-')[1] : 1, e.target.value ))}    />
                </form>
            </div>
            <div className="Task-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                            <th scope="col">Total</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allArticle.length > 0 ?
                                allArticle.map((art, index) => 
                                    
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{art.title}</td>
                                        {/* 
                                        src="http://localhost:3000/articalImage/pp-img.jpg"
                                        */}
                                        <td>
                                            <img                  
                                                src={`http://localhost:3000/articalImage/${art.image}`}  
                                                className="img-fluid img-responsive center-block" width="120" 
                                                alt="" />
                                            <br/>
                                            {art.image}
                                        </td>
                                        <td>article text</td>
                                        <td>{art.createdAt} || {art.updatedAt}</td>
                                        <td>
                                            <Link to={`/article/details/${art.slug}`} >
                                                View
                                            </Link>
                                        </td>
                                        <td>
                                            
                                            <Link to={`/dashboard/article/edit/${art.slug}`} >
                                                <a  className="btn btn-sm btn-primary">
                                                Edit 
                                                </a>
                                            </Link>
                                            <br/>
                                            ||
                                            <br/>
                                            <a href="#" className="btn btn-sm btn-danger">
                                            Delete
                                            </a>
                                        </td>
                                    </tr>
                                    
                                )
                                :
                                "Article not found ..."
                            }

                            
                        </tbody>
                    </table>
                </div>
                <a href="#" className="btn btn-block btn-light">View all</a>
            </div>
        </div>

        {
            articleCount === 0 || articleCount < perPage ? "" 
            : 
            <Pagination
                pageNumber={currentPage ? currentPage.split('-')[1] : 1}
                perPage={perPage}
                itemCount={articleCount}
                path='/dashboard/all-article'    
            />
        }

        

    </div>
  )
}

export default DashboardArticle