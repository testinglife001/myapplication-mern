import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";

import Loading from "./Loader";
import Title from "./Title";
import Button from "./Button";
import Tabs from "./Tabs";
import TaskTitle from "./TaskTitle";
import BoardView from "./BoardView";
 import { tasks } from "./data";
import Table from "./Table";
import AddTask from "./AddTask";
import TaskBoardSidebar from "./TaskBoardSidebar";
import Navbar from "./Navbar";
import { get_all_task_manager } from "../../store/actions/home/taskManagerAction";

{/* 
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
*/}


const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-primary",
  "in progress": "bg-warning",
  completed: "bg-success",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

  const status = params?.status || "";
  // console.log(params);
  // console.log(status);

  useEffect(() => {
    dispatch(get_all_task_manager(status,"",""));
  },[])

  // this is correct
  // console.log(allTaskManage);
  
  // console.log(allTaskManage.status,allTaskManage?.tasks,tasks);
  // const tasks = allTaskManage.tasks;
  // console.log({allTaskManage});
  // console.log({tasks});
  
  // also correct :
  //  console.log(allTaskManage.tasks);
  //  console.log(allUser);

  return loading ? (
    <div className="py-5">
      <Loading />
    </div>
  ) : (
    <div // style={{marginTop:'100px',marginLeft:'auto'}} 
      >
      {
       /*
      <TaskBoardSidebar />
      */
      }
      <Navbar />
      <div className="" style={{marginTop:'100px',marginLeft:'250px'}} >

        <div className="d-flex align-items-center justify-content-between mb-4">

        
        
          {/* 
          <Title title={status ? `${status} Tasks` : "Tasks"} />
          <Title title={status ? `${status} Tasks` : "Tasks"} />
          */}
          <br/>
          <Title title={status ? `${status} Tasks` : "Tasks"} />
          
          
          {
          
          !status && (      
              <Button
                  onClick={() => setOpen(true)}
                  label="Create Task"
                  icon={<IoMdAdd className="fs-5" />}
                  className="d-flex align-items-center gap-1 btn btn-primary"
              />
          )
          
          }
          
               
        </div>

        

        {
          /*
          allTaskManage.length > 0 ?
          allTaskManage.map((task,index) => (
            <ul>
            <li key={index} value={task._id} 
             
              > 
              {task.title} 
            </li>            
            <span className="flex-grow-1">{userId}</span>
            
            </ul>
          ))              
          :
          ''
          */
        }
          ww
          <br/>
            {
              allTaskManage?.tasks?.length
            }
            {
              
              allTaskManage?.tasks?.length > 0 ?
              allTaskManage?.tasks?.map((task) => (
                <ul>
                <li 
                
                  > 
                  {task.title} 
                </li>            
                
                
                </ul>
              ))              
              :
              ''
              
            }
          hh
          {
          
          <Tabs tabs={TABS} setSelected={setSelected}>
              {!status && (
              <div className="w-100 d-flex justify-content-between gap-3 py-4">
                  <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                  <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
                  <TaskTitle label="Completed" className={TASK_TYPE.completed} />
              </div>
              )}
            
            

          
              {
                
                selected !== 1 ? (
                  
                  <BoardView 
                    // tasks={tasks} 
                    />
                  
                  
              
              ) : (
              <div className="w-100">
                  
                  <Table 
                    // tasks={tasks} 
                    />
                  
                  
              
              </div>
              )
              
              }
              
          </Tabs>
          
          }


        {
         
        <AddTask open={open} setOpen={setOpen} />
        
        }

      </div>
    </div>
  );
};

export default Tasks;
