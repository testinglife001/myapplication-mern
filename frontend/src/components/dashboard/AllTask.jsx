import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import { get_all_task } from '../../store/actions/Dashboard/taskAction';


const AllTask = () => {

    const dispatch = useDispatch();
    
    const {currentPage} = useParams();
    // console.log(currentPage);

    const { allTask, perPage, taskCount, taskSuccessMessage } = useSelector(state=>state.dashboardTask);
    // console.log(allTask);

    useEffect(() => {
        if(taskSuccessMessage){
            toast.success(taskSuccessMessage);
            dispatch({type: 'TASK_SUCCESS_MESSAGE_CLEAR'});
        }
        dispatch(get_all_task(currentPage ? currentPage.toString().split('-')[1] : 1));
    }, [currentPage, taskSuccessMessage]);

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
            <title>All Task</title>
        </Helmet>

        AllTask
        All Tasks ( {taskCount} )
        <div>
        <div className="Task mb-4 ">
                            
            <div className="Task-header border-bottom-0">
                
                <form className="d-flex align-items-center ">
                    <span className="position-absolute ps-3 search-icon">
                    <i className="fe fe-search"></i>
                    </span>
                    <input  className="form-control ps-6" 
                            placeholder="Search Task" 
                            type="text"  />
                </form>

                

                <button className="btn btn-secondary "  id="dropdownMenuButton1">
                    Notification
                </button>
                &nbsp;
                <button className="btn btn-danger"  id="dropdownMenuButton1">
                <Link to="/dashboard/all-subtask" className="dropdown-item">
                    All Sub Task
                </Link>
                </button>
                &nbsp;
                <button className="btn btn-success"  id="dropdownMenuButton1">
                <Link to="/dashboard/add-subtask" className="dropdown-item">
                    Add Sub Task
                </Link>
                </button>

            </div>
                            
            <div className="table-responsive border-0 overflow-y-hidden">
            <table className="table mb-0 text-nowrap">
                <thead className="table-light">
                    <tr>
                        <th className="border-0 font-size-inherit">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="checkAll" />
                                <label className="form-check-label" for="checkAll"></label>
                            </div>
                        </th>
                        <th className="border-0">TAG</th>
                        <th className="border-0">SLUG</th>
                        <th className="border-0">POSTS</th>
                        <th className="border-0"> 
                                DATE CREATED
                                <br/>
                                DATE UPDATED
                            </th>
                        <th className="border-0">
                            STATUS
                        </th>
                        <th className="border-0"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTask.length > 0 ?
                        allTask.map((t, index) => 
                            
                        
                        <tr className="accordion-toggle collapsed"  
                            key={index}    >
                            <td className="align-middle border-top-0">
                                i
                            </td>
                            <td className="align-middle border-top-0">
                                <a href="#" className="text-inherit position-relative">
                                    <h5 className="mb-0 text-primary-hover">
                                        <i className="fe fe-chevron-down fs-4 me-2 text-muted position-absolute ms-n4 mt-1">
                                        </i> 
                                            {t.taskName}
                                    </h5>
                                </a>
                            </td>
                            <td className="align-middle border-top-0">
                                {t.taskSlug}
                            </td>
                            <td className="align-middle border-top-0">
                                ??
                            </td>
                            <td className="align-middle border-top-0">
                                {t.createdAt}
                            <br/>
                                {t.updatedAt} 
                            </td>
                            <td className="align-middle border-top-0">
                                <span className="badge-dot bg-success"></span>Active
                            </td>
                            <td className="text-muted align-middle border-top-0">
                            <span className="dropdown dropstart">                                   
                            <span className="dropdown-header"></span>
                                <a className="dropdown-item" href="#">
                                <i className="fe fe-send dropdown-item-icon"></i>Publish</a>
                                <a className="dropdown-item" href="#">
                                    <i className="fe fe-inbox dropdown-item-icon"></i>Moved
                                    Draft
                                </a>                                               
                                                                
                                <Link  >
                                <button type="button" className="btn btn-default btn-sm"
                                        >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                                Edit
                                </button>
                                </Link>                                                
                                
                                <br/>

                                <button type="button" className="btn btn-default btn-sm"
                                     >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                                Delete
                                </button>
                                
                            </span>                                  
                            </td>
                        </tr>
                        
                            
                        )
                        :
                        "Task not found ..."
                    }
                    
                    
                    
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AllTask