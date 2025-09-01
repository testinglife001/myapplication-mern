import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from "./TaskCard";
import { get_all_task_manager, get_all_user } from "../../store/actions/home/taskManagerAction";

const BoardView = ( /* { tasks } */ ) => {

  const dispatch = useDispatch();
   const {userInfo} = useSelector(state => state.adminReducer);
   const {allUser, allTaskManage} = useSelector(state=>state.taskManagerReducer);

   useEffect(() => {
      dispatch(get_all_task_manager('','',''));
   },[]);

   useEffect(() => {
      dispatch(get_all_user());
   },[])
  
   console.log(userInfo);
   console.log(allUser);
   console.log(allTaskManage);

  return (
    <div className="w-100 py-4">
      <div className="row g-4 g-xxl-5">
        {
          /*
          tasks.map((task, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
            <TaskCard task={task} />
          </div>
          ))
          */
        }
          
        {
          
          allTaskManage?.tasks?.length > 0 ?
          allTaskManage?.tasks?.map((task,index) => (
            <TaskCard
              task={task} 
              />
          ))              
          :
          ''
          
        }

      </div>
    </div>
  );
};

export default BoardView;
