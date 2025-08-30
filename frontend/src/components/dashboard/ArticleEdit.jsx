import React, { useEffect, useRef, useState } from 'react';
import  Helmet  from 'react-helmet';
import JoditEditor from 'jodit-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_article, edit_article, get_tag_category, update_article } from '../../store/actions/Dashboard/articleAction';
import toast, {Toaster} from 'react-hot-toast';



const ArticleEdit = ({history}) => {

    const {articleSlug} = useParams();
    const dispatch = useDispatch();

    const {allCategory, allTag, loader, articleError, articleSuccessMessage, editArticle, editRequest} 
        = useSelector(state=>state.dashboardArticle);

    const [text, setText] = useState('');
    const editor = useRef();
    const config = {
        readonly : false
    }

    const [state, setState] = useState({
        title: '',
        category: '',
        tag: ''
    })

    const [slug, setSlug] = useState('');
    const [updateBtn, setUpdateBtn] = useState(false);
    const [image, setImage] = useState({
        imageName: '',
        img: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const titleHandle = (e) => {
        setState({
            ...state,
            title : e.target.value
        });
        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug);
    }

    // console.log(state);

    const slugHandle = (e) => {
        setSlug(e.target.value);
        setUpdateBtn(true);
    }

    const updateSlug = (e) => {
        e.preventDefault();
        const newSlug = slug.trim().split(' ').join('-');
        setSlug(newSlug);
        setUpdateBtn(false);
    }


    // console.log(state);
    // console.log(image);

    useEffect(() => {
        dispatch(get_tag_category());
    },[])

    useEffect(() => {
        if(editRequest){
            setState({
                title: editArticle.title,
                category: editArticle.category_slug,
                tag: editArticle.tag_slug
            })
            setSlug(editArticle.slug)
            setText(editArticle.articleText)
        }
       
    },[editRequest])

    const updateArticle = (e) => {
        e.preventDefault();
        // console.log(state);
        // onsole.log(state);
        const { title, category, tag } = state; 

        // dispatch(add_article(formData));
        dispatch(update_article({
            title,
            category,
            tag,
            slug,
            text,
            articleId: editArticle._id
        }));
    }

    useEffect(()=> {

        if(articleSuccessMessage){
            // toast.success(articleSuccessMessage)
            // dispatch({
            //    type: 'ARTICLE_SUCCESS_MESSAGE_CLEAR'
            // })
            history.push('/dashboard/all-article');
        }

    },[articleSuccessMessage])


    

    useEffect(() => {
        dispatch(edit_article(articleSlug));
    },[])

    return (
        <div>
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
                <title>Edit Article</title>
            </Helmet>


            <h3>Article Edit or <b>Update Edit</b></h3>
            <div className="mt-4">
            <form onSubmit={updateArticle} enctype="multipart/form-data"   >
                
            <div className="row">

                <div className="mb-3 col-md-9">
                <label for="postTitle" className="form-label">Title</label>
                <input type="text" id="postTitle" className="form-control text-dark" placeholder="Post Title" 
                    name="title"    onChange={titleHandle}  value={state.title}    />
                <small>Keep your post titles under 60 characters. Write
                    heading that describe the topic content.
                    Contextualize for Your Audience.</small>
                </div>
                <p className="p-2 text-center text-danger" >
                    { articleError ? articleError.title : "" }
                </p>


                <div className="mb-3 col-md-9">
                <label for="postSlug" className="form-label">Slug</label>
                <input type="text" id="postSlug" className="form-control text-dark" placeholder="Post Slug" 
                    name="slug"     onChange={slugHandle}    value={slug}    />
                <small>your-post-titles-under-60-characters</small>
                <br/>
                {
                    updateBtn ? 
                    (
                        <button className="mt-2 btn btn-sm btn-outline-secondary" 
                            onClick={updateSlug}    >
                            Update
                        </button>
                    )
                    : 
                    ''
                }
                </div>
                <p className="p-2 text-center text-danger" >
                    { articleError ? articleError.slug : "" }
                </p>
                


                <div className="mb-3 col-md-9">
                <label className="form-label">Category</label>
                <select className="selectpicker form-control" data-width="100%"
                    name="category"    onChange={inputHandle}  value={state.category}    >
                    <option value="">Choose Category</option>

                    {
                        allCategory.length > 0 ?
                        allCategory.map((c,index) => {
                            return (
                                <option key={index} value={c.categorySlug}  >
                                    { c.categoryName }
                                    
                                </option>
                            )
                        })
                        :
                        '' 
                    }

                </select>
                </div>
                <p className="p-2 text-center text-danger" >
                    { articleError ? articleError.category : "" }
                </p>


                <div className="mb-3 col-md-9">
                <label className="form-label">Tag</label>
                <select className="selectpicker form-control" data-width="100%"
                    name="tag"  onChange={inputHandle}  value={state.tag}    >
                    <option value="">Choose Tag</option>

                    {
                        allTag.length > 0 ?
                        allTag.map((t,index) => {
                            return (
                                <option key={index} value={t.tagSlug} >
                                    {t.tagName}
                                </option>
                            )
                        })
                        :
                        '' 
                    }

                </select>
                </div>
                <p className="p-2 text-center text-danger" >
                    { articleError ? articleError.tag : "" }
                </p>


                <div className="mb-3 col-md-9">
                <label for="postTitle" className="form-label">Image</label>
                <input type="file" id="postTitle" className="form-control text-dark" placeholder="Post Title" />
                <small>Image</small>
                </div>



                <div className="mb-3 col-md-9">
                <JoditEditor
                    value={text}
                    tabIndex = {1}
                    ref = {editor}
                    config={config}
                    onBlur={newText => setText(newText)}
                    onChange={newText => {}}
                />
                </div>
            </div>

            <div className="mb-3 col-md-11 text-center ">

            {
                loader ? 
                <div>

                    <div className="text-center">
                    <div className="spinner-border m-5 " role="status">
                    </div>
                    <h4 className="text-center">
                        Please Wait ...
                    </h4>
                    <br/>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-grow text-primary"
                            role="status">
                        </div>
                        <span className='px-4' >
                            <h5>Processing</h5>
                        </span>
                        <div className="spinner-grow text-primary"
                            role="status">
                        </div>
                    </div>
                    <br/>
                    <br/>
                    
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                    </div>
                    
                </div>

                : 

                    <button
                    className="btn btn-primary"
                    type="submit"
                    >
                    "Update Article"
                    </button>
                }          
            
            </div>

            </form>
            </div>
        </div>
      )
}

export default ArticleEdit