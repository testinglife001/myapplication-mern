import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import { getAllToDoList } from '../../store/actions/Dashboard/todoAction';

const AllToDo = () => {

  const dispatch = useDispatch();
  const { todoSuccessMessage, allJob, allToDos, allToDo, todoError} 
            = useSelector(state=>state.dashboardToDo);
  // console.log(taskList);
  // console.log(allToDo);
  // console.log(allToDos);

  useEffect(() => {
    // console.log(taskList);
    dispatch(getAllToDoList());
  },[]);

  useEffect(() => {
    if(todoSuccessMessage){
        toast.success(todoSuccessMessage);
        dispatch({type: 'TODO_SUCCESS_MESSAGE_CLEAR'});
      }
    // dispatch(get_all_task(currentPage ? currentPage.toString().split('-')[1] : 1));
  }, [ /*currentPage*/ , todoSuccessMessage]);


  const renderToDoLists = (allToDos) => {
    let mytodoLists = [];
    for (let todoList of allToDos){
      mytodoLists.push(
        <li key={todoList._id} >
          {todoList.todoName}
          {
            //todoList._id
          }
          { 
            // console.log(todoList.children?.length)
          }
          { // console.log(todoList.children)
          }
          {
            // console.log(todoList.children.length);
            
            todoList.children?.length > 0 ?
            (<ul>
              {renderToDoLists(todoList.children)}
            </ul>)
            :
            null
            
          }
        </li>
      )
    }
    return mytodoLists;
  }


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
          <title>All To Do AllToDo</title>
      </Helmet>  
      
      AllToDo
      All To Do List count

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
              <ul className="list-unstyled px-5" >
                {
                  renderToDoLists(allToDos)
                }
              </ul>
            </div>
        </div>
        </div>      

    </div>
  )
}

export default AllToDo