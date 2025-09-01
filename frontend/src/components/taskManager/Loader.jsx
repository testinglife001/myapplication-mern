import React from 'react'
import './Loader.css'

const Loading = () => {
  return (
    <div>
        <div className="dots-container" >

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
    </div>
  )
}

export default Loading