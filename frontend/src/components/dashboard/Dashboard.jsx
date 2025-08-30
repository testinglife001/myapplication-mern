import React, { useState } from 'react'
// import "./Dashboard.css"
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom'
import  Helmet  from 'react-helmet'
import DashboardNavbar from './DashboardNavbar'


import DashboardIndex from './DashboardIndex'
import DashboardArticle from './DashboardArticle'
import ArticleAdd from './ArticleAdd'
import ArticleEdit from './ArticleEdit'
import AllCategory from './AllCategory'
import AddCategory from './AddCategory'
import AllTag from './AllTag'
import AddTag from './AddTag'
import EditCategory from './EditCategory'
import EditTag from './EditTag'
import SideMenu from './SideMenu'
import Content from './Content'
import AllCategoryList from './AllCategoryList'
import AllTask from './AllTask'
import AddTask from './AddTask'
import AllSubTask from './AllSubTask'
import AddSubTask from './AddSubTask'
import AllJob from './AllJob'
import AddJob from './AddJob'
import EditJob from './EditJob'
import AllToDo from './AllToDo'
import AddToDo from './AddToDo'
import AllSubAdmin from './AllSubAdmin'
import AllUser from './AllUser'
import SubAdminProfile from './SubAdminProfile'
import AllComment from './AllComment'
/*
import AllTask from './AllTask'
import AddTask from './AddTask'
import AllSubTask from './AllSubTask'
import AddSubTask from './AddSubTask'
import AllJob from './AllJob'
import AddJob from './AddJob'
import EditJob from './EditJob'
import AddToDo from './AddToDo'
import AllToDo from './AllToDo'
import AllCategoryList from './AllCategoryList'
*/

const Dashboard = () => {

  const [inactive, setInactive] = useState(false);

  return (
    <div>
    <div>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <DashboardNavbar />
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2 " >

                {
                  /* 
                  <DashboardSidebar />
                  */
                }
                <SideMenu 
                      onCollapse={(inactive) => {
                        console.log(inactive);
                        setInactive(inactive);
                      }}
                  />

                
                </div>
                <div className="col-md-9 col-lg-10" style={{marginTop:"40px"}} >
                Dashboard
                <Switch>
                    <Route path="/dashboard" component={DashboardIndex} exact />

                    <Route path="/dashboard/content" component={Content} exact />
                    <Route path="/dashboard/content/courses" component={Content} exact />
                    <Route path="/dashboard/content/videos" component={Content} exact />

                    <Route path="/dashboard/all-article/:currentPage?" 
                      component={DashboardArticle} exact />
                    <Route path="/dashboard/add-article" component={ArticleAdd} exact />
                    <Route path="/dashboard/article/edit/:articleSlug" 
                      component={ArticleEdit} exact />
                    
                    <Route path="/dashboard/all-category/:currentPage?" 
                      component={AllCategory} exact />
                    <Route path="/dashboard/add-category" 
                      component={AddCategory} exact />
                    <Route path="/dashboard/category/edit/:categorySlug" 
                      component={EditCategory} exact />
                    

                    <Route path="/dashboard/all-tag/:currentPage?" 
                      component={AllTag} exact />
                    <Route path="/dashboard/add-tag" 
                      component={AddTag} exact />
                    <Route path="/dashboard/tag/edit/:tagSlug" 
                      component={EditTag} exact />

                    <Route path="/dashboard/all-category-list" 
                      component={AllCategoryList} exact />


                    <Route path="/dashboard/all-task/:currentPage?" 
                      component={AllTask} exact />
                    <Route path="/dashboard/add-task" 
                      component={AddTask} exact />
                    <Route path="/dashboard/task/edit/:taskSlug" 
                      component={Dashboard} exact />

                    <Route path="/dashboard/all-subtask/:currentPage?" 
                      component={AllSubTask} exact />
                    <Route path="/dashboard/add-subtask" 
                      component={AddSubTask} exact />
                    <Route path="/dashboard/subtask/edit/:subtaskSlug" 
                      component={Dashboard} exact />

                    <Route path="/dashboard/all-job" 
                      component={AllJob} exact />
                    <Route path="/dashboard/add-job" 
                      component={AddJob} exact />
                    <Route path="/dashboard/job/edit/:jobSlug" 
                      component={EditJob} exact />

                    <Route path="/dashboard/all-todo" 
                      component={AllToDo} exact />
                    <Route path="/dashboard/add-todo" 
                      component={AddToDo} exact />
                    <Route path="/dashboard/todo/edit/:todoSlug" 
                      component={Dashboard} exact />
                    
                    <Route path="/dashboard/all-sub-admin/:currentPage?" 
                      component={AllSubAdmin} exact />

                    <Route path="/dashboard/all-user/:currentPage?" 
                      component={AllUser} exact />
                    
                    <Route path="/dashboard/sub-admin-profile/:adminId" 
                      component={SubAdminProfile} exact />

                    <Route path="/dashboard/comments/:currentPage?" 
                      component={AllComment} exact />
                    

                </Switch>                        
                Dashboard Index
                </div>
            </div>
            
           
        </div>
        
    </div>
    </div>
  )
}

export default Dashboard