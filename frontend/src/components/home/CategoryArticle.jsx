import React, { useEffect, useRef, useState } from 'react'
import { Link, Router, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_category_article } from '../../store/actions/home/homeAction';
import Article from './Article';
import Pagination from './Pagination';

const CategoryArticle = () => {

  const dispatch = useDispatch();
  const { currentPage, categorySlug } = useParams();

  const {allArticle, articleCount, perPage} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(get_category_article(categorySlug,currentPage ? currentPage.split('-')[1] : 1));
  },[dispatch,currentPage,categorySlug]);

  return (
    <div>
        CategoryArticle

        <div>
            <div className="mb-5" >
                <span className="badge bg-secondary" >
                <h3>Post Section</h3>
                </span>
                <br />
            </div>

            <div className="container mt-3" >

                {
                    allArticle.length > 0 ?
                    allArticle.map((art, index) => 
                        <Article key={index} art={art} />
                    )
                    :
                    <h3>Article not found ...</h3>
                }


            </div>
        </div>

        {
        perPage <= articleCount ?
            
            <Pagination
                    pageNumber={currentPage ? currentPage.split('-')[1] : 1}
                    perPage={perPage}
                    itemCount={articleCount}
                    path={`/article/category/${categorySlug}`} 
                /> : null
        }

    </div>
  )
}

export default CategoryArticle