import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({pageNumber, perPage, itemCount, path}) => {

    let totalPage = Math.ceil(itemCount/perPage);
    let startLink = pageNumber;
    let diff = totalPage - pageNumber;
    if(diff <= 4) {
        startLink = parseInt(totalPage) - 4;
    }
    let endLink = parseInt(startLink) + 4;
    if(startLink <= 0) {
        startLink = 1;
    }
    const createLink = () => {
        const storeLink = [];
        for(var i = startLink; i < endLink; i++){
            storeLink.push(
                <div  >
                    <li key={i} className={parseInt(pageNumber) === i ? "active" : ""} aria-current="page" >
                    <Link to={`${path}/page-${i}`} className="page-item" >
                    <span className="page-link" >
                        {i}
                    </span>
                    </Link>
                    </li>
                </div>
                
                
            )
        }
        return storeLink;
    }

    const nextPage = () => {
        if(pageNumber < totalPage){
            return (
                <li className="page-item" aria-current="page">
                    <Link to={`${path}/page-${parseInt(pageNumber) + 1}`} >
                    <a className="page-link"  aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </Link>
                </li>
            )
        } else {
            return (
                <li className="page-item disabled" aria-current="page">
                    <Link to='' >
                    <a className="page-link"  aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </Link>
                </li>
            )
        }
    }

    const previousPage = () => {
        if(pageNumber > 1){
            return (
                <li className="page-item" aria-current="page">
                    <Link to={`${path}/page-${parseInt(pageNumber) - 1}`} >
                    <a className="page-link"  aria-label="Previous" >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </Link>
                </li>
            )
        } else {
            return (
                <li className="page-item disabled" aria-current="page">
                    <Link to='' >
                    <a className="page-link"  aria-label="Previous" >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </Link>
                </li>
            )
        }
    }

  return (
    <div>             
        
        <div  >
        <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center pagination-sm">
            {previousPage()}
            {createLink()}
            {nextPage()}
        </ul>
        </nav>

        <br/><hr/><br/>

        <nav>
        
        <ul className="pagination justify-content-center pagination-sm">
        
        <div className=" active"><Link className="page-link" href="#">This will work</Link>
        </div>
        <div className="page-link"><Link className="" href="#">||::||</Link>
        </div>
        <div className=""><Link className="page-link" href="#">This will work</Link>
        </div>
        <div className=" active"><Link className="page-link" href="#">||::||</Link>
        </div>
        <div className=""><Link className="page-link" href="#">..==..</Link>
        </div>
            
            <li className=""><Link className="page-link">1</Link></li>
            <li className=" active"><Link className="page-link" href="#">2</Link></li>
            <li className=""><Link className="page-link">3</Link></li>
            <li className=""><Link className="page-link">4</Link></li>
            <li className=""><Link className="page-link">5</Link></li>

        </ul>
        </nav>
        

        </div>           
                 
    </div>
    
  )
}

export default Pagination