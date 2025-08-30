import React, { useEffect, useRef, useState } from 'react'
import { Link, Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar'
import Footer from './Footer'
import HomeArticle from './HomeArticle'
import HomePost from './HomePost'
import ArticleDetails from './ArticleDetails';
import CategoryArticle from './CategoryArticle';
import TagArticle from './TagArticle';
import { get_home_tag_category } from '../../store/actions/home/homeAction';
// import { get_home_tag_category } from '../../store/actions/home/homeAction';

// import TaskManager from '../taskManager/TaskManager';
// import CreateBlog from './CreateBlog';

const Home = ({history}) => {

  const dispatch = useDispatch();
  const { allCategory, allTag } = useSelector(state => state.homeReducer);
  const [value, setValue] = useState("");
  const nav = useRef();
  const search = (e) => {
    e.preventDefault();
    history.push(`/article/search/${value}`);
  }
  
  /*
  const [items, setItems] = useState();

  useEffect(() => {
    // fetch('http://localhost:5000/');
    
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/item');
      const data = await res.json();
      // console.log(data);
       setItems(data.items);
    }
    fetchData(); 
  }, [])
  */
  const scrollTop = () => {
    nav.current?.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    dispatch(get_home_tag_category());
  },[])

  return (
    <div>
        <Navbar nav={nav} />

        <br/>

        <div className="container" >
          <div className=" mx-auto p-4 py-md-5" >

            <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
              <a href="/" className="d-flex align-items-center text-body-emphasis text-decoration-none">
                <svg className="bi me-2" width="40" height="32">
                  <use href="#bootstrap"/>
                </svg>
                <span className="fs-4">Starter template</span>
                

              </a>
            </header>
            

              { /*
              items?.map(i => (
                <p>{i._id} - {i.name}, {i.description} </p>
              )) */
              }

            <main>
              <h1 className="text-body-emphasis">Get started with Bootstrap</h1>
              <p className="fs-5 col-md-12">Quickly and easily get started with Bootstrap's compiled.</p>

              <div className="mb-5">
                <a href="/" class="btn btn-primary btn-lg px-4">Download examples</a>
              </div>  

              <hr className="col-lg-12 col-md-2 mb-5" /> 
              
              <div className="row" >

              <div className="col-md-8">

                <h2 className="text-body-emphasis">Starter projects</h2>
                <h3 className="pb-4 mb-4 fst-italic border-bottom">
                  From the Firehose
                </h3>
                <p>Ready to go beyond the starter template? Check out.</p>
                <ul className="list-unstyled ps-0 mb-5 py-5 border-bottom">
                  <li>
                    <a className="icon-link mb-1" href="https://github.com/twbs/examples/tree/main/icons-font" 
                      rel="noopener" target="_blank">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap npm starter
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="https://github.com/twbs/examples/tree/main/parcel" 
                      rel="noopener" target="_blank">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap Parcel starter
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="https://github.com/twbs/examples/tree/main/vite" 
                      rel="noopener" target="_blank">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap Vite starter
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="https://github.com/twbs/examples/tree/main/webpack" 
                      rel="noopener" target="_blank">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap Webpack starter
                    </a>
                  </li>
                </ul>

                
                <div className="mb-5" >
                  <span className="badge bg-secondary" >
                    <h3>Home Articles</h3>
                  </span>
                  <br />
                </div>
                


                <Switch>
                  <Route path="/" component={HomePost} exact />
                  <Route path="/article/:currentPage?" component={HomePost} exact />
                  <Route path="/article/detail/:slug" component={ArticleDetails} exact />
                  <Route path="/article/category/:categorySlug/:currentPage?" 
                    component={CategoryArticle} exact />
                  <Route path="/article/tag/:tagSlug/:currentPage?"  component={TagArticle} exact />
                  <Route path="/article/search/:searchValue" component={HomeArticle} exact />

                  {/* 
                  <Route path="/task-manager" component={TaskManager} exact />
                  */}

                  {/* 
                  <Route path="/create-blog"   component={CreateBlog} exact />
                  */}
                  
                  

                </Switch>                

              </div>          
              
              <div className="col-md-4">
                <div className="p-4 mb-3 rounded">
                  <div className="p-4">
                    <h4 className="fst-italic">Search</h4>
                    <form className="form-inline" >
                      <div className="col-12 py-3">
                        <input
                          type="text"                         
                          className="form-control search-input"
                          placeholder="Search blog"
                          onChange={ (e) => setValue(e.target.value) }
                        />
                      </div>
                      <button className="btn btn-secondary search-btn"
                        onClick={search} >
                        Search
                      </button>
                    </form>
                  </div>
                </div>

                <h4 className="text-body-emphasis">About</h4>
                <p className="mb-0">Customize this section to tell your visitors a little bit about your 
                  publication, writers, content, or something else entirely. Totally up to you.</p>

                <div className="p-4">
                  <h4 className="fst-italic">Category</h4>
                  <ol className="list-unstyled mb-0">
                    
                    {allCategory?.length > 0 &&
                      allCategory.map((catObj, index) => (
                        <li key={index}>
                          <Link to={`/article/category/${catObj._id.split(" ").join("-")}`}>
                            {catObj._id} ({catObj.count})
                          </Link>
                        </li>
                      ))}
                  </ol>

                </div>

                <div className="p-4">
                  <h4 className="fst-italic">Tag</h4>
                  <ol className="list-unstyled d-flex flex-wrap p-3 justify-content-around">
                  
                  {allTag?.length > 0 &&
                    allTag.map((tagObj, index) => (
                      <li key={index}>
                        <Link
                          to={`/article/tag/${tagObj._id.split(" ").join("-")}`}
                          className="link-body-emphasis px-2 btn btn-sm btn-outline-primary"
                        >
                          {tagObj._id} {/* display tag name */}
                        </Link>
                      </li>
                    ))}
                </ol>

                </div>


                <h2 className="text-body-emphasis">Guides</h2>
                <p>Read more detailed instructions and documentation on using or contributing to Bootstrap.</p>
                <ul className="list-unstyled ps-0">
                  <li>
                    <a className="icon-link mb-1" href="/">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap quick start guide
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="/">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap Webpack guide
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="/">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap Parcel guide
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="/">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Bootstrap Vite guide
                    </a>
                  </li>
                  <li>
                    <a className="icon-link mb-1" href="/">
                      <svg className="bi" width="16" height="16">
                        <use href="#arrow-right-circle"/>
                      </svg>
                      Contributing to Bootstrap
                    </a>
                  </li>
                </ul>

                {/* create component == "Popular Posts or Articles" */}

                <div className="text-center py-5 mb-4" >
                  <h1 className="text-muted">Popular Article Component</h1>
                  <h4 className="fst-italic">Popular posts</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a className="d-flex flex-column flex-lg-row gap-3 align-items-start 
                        align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" 
                        href="#">
                        <div className="col-lg-12">
                          <h6 className="mb-0">Example blog post title</h6>
                          <small className="text-body-secondary">January 15, 2024</small>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="d-flex flex-column flex-lg-row gap-3 align-items-start 
                        align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" 
                        href="#">
                        
                        <div className="col-lg-12">
                          <h6 className="mb-0">This is another blog post title</h6>
                          <small className="text-body-secondary">January 14, 2024</small>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="d-flex flex-column flex-lg-row gap-3 align-items-start 
                        align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" 
                        href="#">
                        
                        <div className="col-lg-12">
                          <h6 className="mb-0">Longer blog post title: This one has multiple lines!</h6>
                          <small className="text-body-secondary">January 13, 2024</small>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-4">
                  <h4 className="fst-italic">Calendar</h4>
                  <ol className="list-unstyled mb-0">
                    <li><a href="#">March 2021</a></li>
                    <li><a href="#">February 2021</a></li>
                    <li><a href="#">January 2021</a></li>
                    <li><a href="#">December 2020</a></li>
                    <li><a href="#">November 2020</a></li>
                    <li><a href="#">October 2020</a></li>
                    <li><a href="#">September 2020</a></li>
                    <li><a href="#">August 2020</a></li>
                    <li><a href="#">July 2020</a></li>
                    <li><a href="#">June 2020</a></li>
                    <li><a href="#">May 2020</a></li>
                    <li><a href="#">April 2020</a></li>
                  </ol>
                </div>

                

              </div>
              
              </div>

            </main>

          </div>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Home