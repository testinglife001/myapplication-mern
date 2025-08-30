import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { get_all_article } from '../../store/actions/home/homeAction';
import Article from './Article';

const HomePostAlt = () => {
  const { currentPage } = useParams();
  const dispatch = useDispatch();
  const { allArticle, articleCount, perPage } = useSelector(state => state.homeReducer);

  useEffect(() => {
    const page = currentPage ? parseInt(currentPage.split('-')[1]) : 1;
    dispatch(get_all_article(page, ""));
  }, [dispatch, currentPage]);

  return (
    <>
      <div className="mb-5">
        <span className="badge bg-secondary">
          <h3>Post Section</h3>
        </span>
      </div>

      <div className="container mt-3">
        {allArticle?.length > 0 ? (
          allArticle.map((art, index) => <Article key={index} art={art} />)
        ) : (
          <h3>Article not found ...</h3>
        )}
      </div>

      {perPage < articleCount && (
        <Pagination
          pageNumber={currentPage ? parseInt(currentPage.split('-')[1]) : 1}
          perPage={perPage}
          itemCount={articleCount}
          path='/article'
        />
      )}
    </>
  )
}

export default HomePostAlt;
