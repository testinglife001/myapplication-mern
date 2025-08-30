import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_article_details, like_dislike_get, user_article_dislike, user_article_like } from '../../store/actions/home/articleReadAction';

import Comments from './Comments';



const ArticleDetails = () => {

  const dispatch = useDispatch();
  const { slug } = useParams();

  const {readMore, read_article, moreTag, related_article} = useSelector(state => state.homeReducer);

  const {like,dislike,like_status,dislike_status,like_dislike_message} = useSelector(state => state.likeDislike);

  const {userInfo} = useSelector(state => state.adminReducer);

  useEffect(() => {
    // console.log(slug);
    dispatch(get_article_details(slug));
  },[slug]);

  useEffect(() => {
    dispatch(like_dislike_get(slug));
  },[slug]);

  useEffect(() => {
    if(like_dislike_message){
      dispatch(like_dislike_get(slug));
      dispatch({
        type: 'USER_LIKE_DISLIKE_MESSAGE_CLEAR'
      })
    }
  },[like_dislike_message]);

  const article_like = (e) => {
    e.preventDefault();
    // console.log("ok");
    const obj = {
      articleId: read_article._id,
      like_status,
      dislike_status,
      adminId: read_article.adminId
    }
    dispatch(user_article_like(obj));
  }

  const article_dislike = (e) => {
    e.preventDefault();
    // console.log("ok");
    const obj = {
      articleId: read_article._id,
      like_status,
      dislike_status,
      adminId: read_article.adminId
    }
    dispatch(user_article_dislike(obj));
  }

  return (
    
    <div>

      <div className="mb-5" >
        <span className="badge bg-secondary" >
          <h3>Article Details</h3>
        </span>
        <br />
      </div>

      <div className="container" >
        
        <div className="py-3 text-center">
              <h2 className="text-body-emphasis">
                  Title: {read_article?.title}
              </h2>
              <h3 className="pb-4 mb-4 fst-italic ">
                From the Firehose
              </h3>
              <h5 className=" text-start py-2">
                  Category  <Link to={`/article/category/${read_article?.category_slug}`} >
                                  {read_article?.category}
                            </Link>
                </h5>
                <h5 className=" text-start py-2">
                  Tag <Link to={`/article/tag/${read_article?.tag_slug}`} >
                            {read_article?.tag}
                      </Link>
                </h5>
              
        </div>

        <div className="text-center">
          <img className="img-fluid rounded" alt="..."
            src={`http://localhost:3000/articalImage/${read_article?.image}`}
            />
        </div>

        <div className="p-2 d-flex justify-content-between
          border-bottom">              
          <h5 className="p-2 mb-2 fst-italic">
            From the Firehose
          </h5>             
          <div>
            {
              userInfo && userInfo.role === 'user' ? 
                (
                  <button className=" btn btn-success" onClick={article_like} >
                    <span className={like_status === 'like' ? 'p-2 mb-2 text-dark' : 'p-2 mb-2'} >Like</span>
                  </button>
                )
              :
              (
                <button disabled className=" btn btn-success" >
                  <span className="p-2 mb-2  " >Like</span>
                </button>
              )

            }
            
            <span className="p-2 mb-2  btn-success" >{like}</span>

            &nbsp;&nbsp;&nbsp;

            {
              userInfo && userInfo.role === 'user' ? 
                (
                  <button className=" btn btn-danger" onClick={article_dislike} >
                    <span className={dislike_status === 'dislike' ? 'p-2 mb-2 text-dark' : 'p-2 mb-2'} >Dislike</span>
                  </button>
                )
              :
              (
                <button disabled className=" btn btn-danger" >
                  <span className="p-2 mb-2" >Dislike</span>
                </button>
              )

            }
            
            <span className="p-2 mb-2 btn-danger" >{dislike}</span>
            
          </div>              
        </div>

        <p className="pt-2 pb-2 mb-2  fst-italic">
          Detail Page - Article Details
        </p>
        
        <div className=" mx-auto p-4 py-md-5" >               

          <div className="row" >

            <div className="">                

              <article className="blog-post">
                <h2 className="display-5 link-body-emphasis mb-1">Aticle Details Project</h2>
               
                <p className="blog-post-meta">January 1, 2021 by <a href="#">Mark</a></p>

                <p>
                   article text
                </p>
              </article>
              
              <div className="p-0" >
                <span className="text-primary">Read More</span>
                <Link to={readMore?.slug} className="py-0 btn btn-default" >
                  <span className="text-secondary">
                    { readMore?.title }
                  </span>
                </Link>
              </div>

              <div className="p-3 d-flex align-items-start" style={{ float: "left" }}>
                    <h4 className="bg-dark text-light p-2" >Tags</h4>
                    {
                      moreTag.length > 0 && 
                      moreTag.map((tag,index) => 
                      <div className="border bg-light" key={index} >
                        <Link to={`/article/tag/${tag}`} >
                          ( "x" ) &nbsp; { tag.split('-').join(' ') }
                        </Link>
                          
                      </div> 
                      )
                    }          
                </div>

            </div>          
                   
          </div>

          
          <div className="text-start pt-3 py-2 mb-4 border-bottom">
            <h3 className="p-2 mb-0" >Related Articles</h3>
            <p className="text-center">
                Related Blogs not found with this current blog
              </p>
          </div>
          <div className="col-md-12 text-left justify-content-center">
            <div className="row gx-5">
              
            {
              related_article.length > 0 ?
              related_article.map((art,index) => 

              <div className="col-sm-6 col-lg-4 mb-5" key={index} >
              <div className="Task text-decoration-none overflow-hidden h-100">
                <img className="related-img Task-img-top" alt="title"
                   src={`http://localhost:3000/articalImage/${art?.image}`}  />
                <div className=" Task-body p-4">
                  <h5 className=" text-start py-2">title {art?.title}</h5>
                  <p className=" text-start">
                    description
                  </p>
                  <div className="d-flex justify-content-around">
                    <div className="p-0" >
                      <Link to={`/article/detail/${art.slug}`} className="py-0 btn btn-default" >
                        <span className="text-primary">Read More</span>
                      </Link>
                    </div>
                    
                    <div className="py-2" >
                      <i className="bi bi-hand-thumbs-up m-2" />
                       likes
                       <br/>
                      <i className="bi bi-chat-left m-2" />
                       comments 
                    </div>
                  </div>
                </div>
              </div>
            </div>

              )
              :
              <span>Related article not found ...</span>
            }

              
            </div>
          </div>

          
          
          <div className="scroll" >
          <div className="text-start pt-3 py-2 mb-4 border-bottom" >
          <h3 className="p-2 mb-0" >Comments</h3>
          </div>

          
          <div className="" >

            <Comments />
          
            {/* 
          <div className='py-2' >
            <div className="row">
              <div className="col-lg-12">
                <div className="">
                  <div className="d-flex justify-content-around">
                    
                    
                      <div className="">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="user"
                          className="img-thumbnail rounded-circle" height={52} width={65}
                        />
                      </div>
                      <div className="">
                        <h3 className="text-start media-heading user_name">
                          name <small> time & date</small>
                        </h3>
                        <p className="text-start">body</p>
                      </div>
                      
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='py-2' >
            <div className="row">
              <div className="col-lg-12">
                <div className="">
                  <div className="d-flex justify-content-around">
                    
                    
                      <div className="">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="user"
                          className="img-thumbnail rounded-circle" height={52} width={65}
                        />
                      </div>
                      <div className="">
                        <h3 className="text-start media-heading user_name">
                          name <small> time & date</small>
                        </h3>
                        <p className="text-start">body</p>
                      </div>
                      
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
          </div>

          <div className="p-4 mb-3 text-start" >
            <h5>Write your comment</h5>
            <form className="row ">
              <div className="col-12 py-3">
                <textarea
                  rows="4"
                  className="form-control description"
                  placeholder="Please comment ..."
                />
              </div>
            </form>
            <div className="text-center" >
              <button
                  className="btn btn-primary"
                  type="submit"
                >
                Comment
              </button>
            </div>
          </div>
            */}

        </div>
      </div>
      
      </div>

      </div>
        
    </div>
    
  )
}

export default ArticleDetails