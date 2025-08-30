import React from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';


const Article = ({index,art}) => {
  return (
    <div>
        Article

        <div className="Task mb-3"  style={{ maxWidth: "740px" }} 
                            key={index}    >
                        <div className="row g-0">
                            <div className="col-md-4 p-3">
                                <img className="img-fluid rounded" alt="..." 
                                src={`http://localhost:5000/articalImage/${art.image}`}  />
                                <div>category name: {art.category}</div>
                            </div>
                            <div className="col-md-8">
                                <div className="Task-body">
                                    <h5 className="Task-title">Task title: {art.title}</h5>
                                    <span className="px-4 mb-3 bg-body-tertiary rounded">
                                    <p className="bg-light">author: {art.adminName} </p> -&nbsp;
                                    {art.createdAt}
                                    </span>
                                    <p className="Task-text">
                                        article text
                                    </p>
                                    <p className="Task-text">
                                        <small className="text-muted">
                                            Last updated {moment(art.updatedAt).fromNow()}
                                        </small>
                                        <Link to={`/article/detail/${art.slug}`} >
                                            <button className="btn btn-primary">Read More</button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

    </div>
  )
}

export default Article