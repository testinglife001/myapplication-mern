import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { get_comment, reply_comment, user_comment } from '../../store/actions/home/homeCommentAction';
import toast, {Toaster} from 'react-hot-toast';


const Comments = () => {

    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.adminReducer);

    const { read_article } = useSelector(state => state.homeReducer);

    const {loader,comment_message,comment_error,comment} = useSelector(state => state.userComment);

    const [commentText, setCommentText] = useState('');

    const [replyText, setReplyText] = useState('');

    const [show_reply, setReply] = useState('');

    const commentSubmit = (e) => {
        e.preventDefault();
        // console.log(commentText);
        
         const data = {
            articleId: read_article._id,
            articleSlug: read_article.slug,
            articleTitle: read_article.title,
            userName: userInfo.name,
            userImage: userInfo.image,
            commentText
        }
        // console.log(data);
        if(commentText){
            dispatch(user_comment(data));
        }
        
    }

    useEffect(() => {
        if(comment_message){
            setCommentText('');
            setReplyText('');
            setReply('');
            toast.success(comment_message);
            dispatch({type:'COMMENT_MESSAGE_CLEAR'});
            dispatch(get_comment(read_article._id));
        }
    },[comment_message]);

    useEffect(() => {
        if(read_article){
            dispatch(get_comment(read_article._id));
        }
    },[read_article]);

    // console.log(show_reply);

    const replySubmit = (commentId) => {
        // console.log(commentId);
        const data = {
            commentId,
            replyText,
            replyName: userInfo.name,
            replyImage: userInfo.image
        }
        if(replyText){
            dispatch(reply_comment(data));
        }
        setReplyText('');
        setReply('');
    }

  return (
    <div>
        Comments
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

            {
                comment.length > 0 ?
                comment.map((c,index) => 
                    <div className='py-2' key={index} >
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="">


                        <div className="d-flex justify-content-around">
                            
                            
                            <div className="">
                                <img
                                src={c.userImage}
                                alt="user"
                                className="img-thumbnail rounded-circle" height={52} width={65}
                                />
                            </div>
                            <div className="">
                                <h3 className="text-start media-heading user_name">
                                name: {c.userName}<small> time & date: {c.createdAt}</small>
                                </h3>
                                <p className="text-start">body: {c.commentText}</p>
                            </div>
                            
                            
                            
                        </div>


                            <br/>
                            <div>
                                <div className="reply_btn" >
                                    {
                                        userInfo && 
                                        <button 
                                            className="btn btn-info"
                                            onClick={()=> setReply(c._id)}    >
                                            Reply
                                        </button>
                                    }
                                </div>
                                
                                <div className="reply_box" 
                                    style={show_reply === c._id ? {display:'block'} : {display:'none'} }
                                      >
                                    {/* style={{display:'none'}} */} 
                                        
                                    <div  className="row"  >
                                    <div className=" col-lg-12"  >
                                        <img
                                        src={c.userImage}
                                        alt="user"
                                        className="img-thumbnail rounded-circle " height={25} width={30}
                                            />
                                        <input type="text" required placeholder="Add a reply ..." 
                                            className="form-control " 
                                            onChange={(e)=>setReplyText(e.target.value)}
                                            value={replyText}
                                            />
                                    </div>
                                    <div className="text-end " >
                                        <button
                                            onClick={()=>setReply("")}
                                            className="btn btn-danger" >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-success" 
                                            onClick={()=>replySubmit(c._id)} >
                                            Submit
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>

                            {
                                c.replyComment.length > 0  &&
                                c.replyComment.map((r,index) => 
                                <div className='py-2' >
                                    <div className="row">
                                    <div className="col-lg-12">
                                        <div className="">
                    
                                        <ul className="d-flex justify-content-end">
                                            
                                            
                                            <li className="py-2" >
                                                <img
                                                src={r.replyImage}
                                                alt="user"
                                                className="img-thumbnail rounded-circle" height={15} width={20}
                                                />
                                                <h5 className="text-start media-heading user_name">
                                                name {r.replyName}<small> time & date {r.createdAt}</small>
                                                </h5>
                                            </li>
                                            <li className="py-2 ">
                                                
                                                <p className="text-start">body {r.replyText}</p>
                                            </li>
                                            

                                            <div>
                                                <div className="reply_btn" >
                                                    {
                                                        userInfo && 
                                                        <button 
                                                            className="btn btn-info"
                                                            onClick={()=> setReply(r._id)}    >
                                                            Reply
                                                        </button>
                                                    }
                                                </div>
                                                
                                                <div className="reply_box" 
                                                    style={show_reply === r._id ? {display:'block'} : {display:'none'} }
                                                    >
                                                    {/* style={{display:'none'}} */} 
                                                        
                                                    <div  className="row"  >
                                                    <div className=" col-lg-12"  >
                                                        <img
                                                        src={c.userImage}
                                                        alt="user"
                                                        className="img-thumbnail rounded-circle " height={25} width={30}
                                                            />
                                                        <input type="text" required placeholder="Add a reply ..." 
                                                            className="form-control " 
                                                            onChange={(e)=>setReplyText(e.target.value)}
                                                            value={replyText}
                                                            />
                                                    </div>
                                                    <div className="text-end " >
                                                        <button
                                                            onClick={()=>setReply("")}
                                                            className="btn btn-danger" >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="btn btn-success" 
                                                            onClick={()=>replySubmit(c._id)} >
                                                            Submit
                                                        </button>
                                                    </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </ul>
                                        
                                        

                                        </div>
                                    </div>
                                    </div>
                                </div>
                                )
                                
                            }

                        </div>
                    </div>
                    </div>
                    </div>
                )
                :
                "No comments"
            }



            {/* 
                <div className='py-2' >
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="">

                        <ul className="d-flex justify-content-end">
                            
                            
                            <li className="py-2" >
                                <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="user"
                                className="img-thumbnail rounded-circle" height={20} width={25}
                                />
                                <h5 className="text-start media-heading user_name">
                                name <small> time & date</small>
                                </h5>
                            </li>
                            <li className="py-2 ">
                                
                                <p className="text-start">body</p>
                            </li>
                            
                            
                        </ul>

                        </div>
                    </div>
                    </div>
                </div>
            */}
            

          

        <div className="p-4 mb-3 text-start" >
            <h5>Write your comment</h5>
                
                {
                    userInfo && userInfo.role === 'user' ?
                    (
                        <form className="row ">
                            <div className="col-12 py-3">
                                <textarea
                                rows="4"
                                className="form-control description"
                                placeholder="Please comment ..."
                                required
                                onChange={(e)=>setCommentText(e.target.value)}
                                value={commentText}
                                />
                            </div>

                            <div className="text-center" >
                                <button
                                    className="btn btn-primary"
                                    disabled={loader ? true : false}
                                    onClick={commentSubmit}
                                    >
                                    Comment
                                </button>
                            </div>
                        </form>
                    )
                    :
                    (
                        <ul className="d-flex justify-content-around" >
                            <li>
                                <button>
                                    Login FB
                                </button>
                            </li>
                            <li>
                                <button>
                                <Link to='/login' >
                                    Login
                                </Link>
                                </button>
                            </li>
                            <li>
                                <button>
                                    Login Google
                                </button>
                            </li>
                        </ul>
                    )
                }
                
        </div>
        

    </div>
  )
}

export default Comments