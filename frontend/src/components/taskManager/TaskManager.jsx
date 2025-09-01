import React from 'react'
import TaskBoard from './TaskBoard'
import TaskBoardSidebar from './TaskBoardSidebar'
import TaskBoardNavbar from './TaskBoardNavbar'



const TaskManager = () => {
  return (
    <div>
     
    <div >
      
      <div className="d-flex flex-column  flex-md-row vh-100">
        <div className="d-none d-md-block col-md-2 bg-white position-sticky top-0">
                    
          <TaskBoardSidebar />
                 
        </div>
        
        
        <div className="flex-fill overflow-auto ">
          
          {/* 
          <TaskBoardNavbar />
          */}      
          
                
          <div className="p-4">
                        
            <TaskBoard />
          
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TaskManager