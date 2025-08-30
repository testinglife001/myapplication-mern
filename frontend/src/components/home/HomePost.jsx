import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import Pagination from './Pagination';
import { get_all_article } from '../../store/actions/home/homeAction';
import moment from 'moment';

import Article from './Article';

const HomePost = () => {

    const { currentPage } = useParams();
    // console.log(currentPage);
    const dispatch = useDispatch();

    const {allArticle, articleCount, perPage} = useSelector(state => state.homeReducer);

    console.log(allArticle);

    useEffect(() => {
        dispatch(get_all_article(currentPage ? currentPage.toString().split('-')[1] : 1, ""));
    }, [currentPage]);

  return (
    <>

    <div>
        <div className="mb-5" >
            <span className="badge bg-secondary" >
            <h3>Post Section</h3>
            </span>
            <br />
        </div>

        <div className="container mt-3" >

            {
                allArticle?.length > 0 ?
                allArticle.map((art, index) => 
                    <Article key={index} art={art} />
                )
                :
                <h3>Article not found ...</h3>
            }


        </div>
    </div>

    {/* Pagination */}
    {
        perPage <= articleCount ?
            
            <Pagination 
                    pageNumber={currentPage ? currentPage.split('-')[1] : 1}
                    perPage={perPage}
                    itemCount={articleCount}
                    path='/article' 
                /> : null
    }
    


    </>
  )
}

export default HomePost