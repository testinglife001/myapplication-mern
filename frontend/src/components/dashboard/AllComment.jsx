import React from 'react'
import Helmet from 'react-helmet'

const AllComment = () => {
  return (
    <div>
        <Helmet>
            <title>All Comment</title>
        </Helmet>
        AllComment
        <div>
        <div className="Task mb-4 ">
        <div className="container" >
        <div className="row" >

        <div className="col-11" >
        
        <div className="scroll" >
        <div className="text-start pt-3 py-2 mb-4 border-bottom" >
        <h3 className="p-2 mb-0" >Comments</h3>
        </div>
            <div className="" >

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

        </div>

        </div>
        </div>           
        </div>
        </div>
    </div>
  )
}

export default AllComment