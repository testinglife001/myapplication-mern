import React, { useEffect, useRef, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import HomeArticle from './HomeArticle';
import HomePost from './HomePost';
import ArticleDetails from './ArticleDetails';
import CategoryArticle from './CategoryArticle';
import TagArticle from './TagArticle';
import { get_home_tag_category } from '../../store/actions/home/homeAction';
import HomePostAlt from './HomePostAlt';

const HomeAlt = ({ history }) => {
  const dispatch = useDispatch();
  const { allCategory, allTag } = useSelector(state => state.homeReducer);
  const [value, setValue] = useState("");
  const nav = useRef();

  const search = (e) => {
    e.preventDefault();
    history.push(`/article/search/${value}`);
  }

  useEffect(() => {
    dispatch(get_home_tag_category());
  }, [dispatch]);

  return (
    <div>
      <Navbar nav={nav} />
      <br />
      <div className="container">
        <div className="mx-auto p-4 py-md-5">

          <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
            <a href="/" className="d-flex align-items-center text-body-emphasis text-decoration-none">
              <svg className="bi me-2" width="40" height="32">
                <use href="#bootstrap"/>
              </svg>
              <span className="fs-4">Starter template</span>
            </a>
          </header>

          <main>
            <div className="row">
              <div className="col-md-8">
                <Switch>
                  <Route path="/" component={HomePostAlt} exact />
                  <Route path="/article/:currentPage?" component={HomePostAlt} exact />
                  <Route path="/article/detail/:slug" component={ArticleDetails} exact />
                  <Route path="/article/category/:categorySlug/:currentPage?" component={CategoryArticle} exact />
                  <Route path="/article/tag/:tagSlug/:currentPage?" component={TagArticle} exact />
                  <Route path="/article/search/:searchValue" component={HomeArticle} exact />
                </Switch>
              </div>

              <div className="col-md-4">
                {/* Search */}
                <div className="p-4 mb-3 rounded">
                  <h4 className="fst-italic">Search</h4>
                  <form className="form-inline" onSubmit={search}>
                    <input
                      type="text"
                      className="form-control search-input mb-2"
                      placeholder="Search blog"
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <button className="btn btn-secondary">Search</button>
                  </form>
                </div>

                {/* Categories */}
                <div className="p-4">
                  <h4 className="fst-italic">Category</h4>
                  <ol className="list-unstyled mb-0">
                    {allCategory?.map((cat, idx) => (
                      <li key={idx}>
                        <Link to={`/article/category/${cat._id.split(" ").join("-")}`}>
                          {cat._id} ({cat.count})
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tags */}
                <div className="p-4">
                  <h4 className="fst-italic">Tag</h4>
                  <ol className="list-unstyled d-flex flex-wrap justify-content-around">
                    {allTag?.map((tag, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/article/tag/${tag._id.split(" ").join("-")}`}
                          className="px-2 btn btn-sm btn-outline-primary"
                        >
                          {tag._id}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeAlt;
