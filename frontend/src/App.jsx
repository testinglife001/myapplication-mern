import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './App.css';
// import "bootstrap/dist/css/bootstrap.css ";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css'
import Home from './components/home/Home';
import AdminLogin from './components/auth/AdminLogin';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectRoute from './components/auth/ProtectRoute';
import Dashboard from './components/dashboard/Dashboard';
import VerifyEmail from './components/auth/VerifyEmail';
import HomeAlt from './components/home/HomeAlt';

function App() {
  const [state,setState] = useState();
  const dispatch = useDispatch();


  return (
    <>
      <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/admin/login" component={AdminLogin} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/verify" component={VerifyEmail} exact />
        <Route path="/login" component={Login} exact />

        <Route path="/article/:currentPage?" component={HomeAlt} exact />
        <Route path="/article/detail/:slug" component={HomeAlt} exact />
        <Route path="/article/category/:categorySlug/:currentPage?" 
          component={HomeAlt} exact />
        <Route path="/article/tag/:tagSlug/:currentPage?" 
          component={HomeAlt} exact />
        <Route path="/article/search/:searchValue" 
          component={HomeAlt} exact />

        {/*
        <Route path="/article/:currentPage?" component={Home} exact />
        <Route path="/article/detail/:slug" component={Home} exact />
        <Route path="/article/category/:categorySlug/:currentPage?" 
          component={Home} exact />
        <Route path="/article/tag/:tagSlug/:currentPage?" 
          component={Home} exact />
        <Route path="/article/search/:searchValue" 
          component={Home} exact /> 
        */}

         <ProtectRoute path="/dashboard" component={Dashboard} exact />

        <Route path="/dashboard/all-article/:currentPage?" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-article" 
          component={Dashboard} exact />
        <Route path="/dashboard/article/edit/:articleSlug" 
          component={Dashboard} exact />

        <Route path="/dashboard/all-category/:currentPage?" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-category" 
          component={Dashboard} exact />
        <Route path="/dashboard/category/edit/:categorySlug" 
          component={Dashboard} exact />

        <Route path="/dashboard/all-tag/:currentPage?" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-tag" 
          component={Dashboard} exact />
        <Route path="/dashboard/tag/edit/:tagSlug" 
          component={Dashboard} exact />

        <Route path="/dashboard/all-category-list" 
          component={Dashboard} exact />

        <Route path="/dashboard/content" 
          component={Dashboard} exact />
        <Route path="/dashboard/content/courses" 
          component={Dashboard} exact />
        <Route path="/dashboard/content/videos" 
          component={Dashboard} exact />
        
        <Route path="/dashboard/all-task/:currentPage?" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-task" 
          component={Dashboard} exact />
        <Route path="/dashboard/task/edit/:taskSlug" 
          component={Dashboard} exact />

        <Route path="/dashboard/all-subtask/:currentPage?" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-subtask" 
          component={Dashboard} exact />
        <Route path="/dashboard/subtask/edit/:subtaskSlug" 
          component={Dashboard} exact />


        <Route path="/dashboard/all-job" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-job" 
          component={Dashboard} exact />
        <Route path="/dashboard/job/edit/:jobSlug" 
          component={Dashboard} exact />

        <Route path="/dashboard/all-todo" 
          component={Dashboard} exact />
        <Route path="/dashboard/add-todo" 
          component={Dashboard} exact />
        <Route path="/dashboard/todo/edit/:todoSlug" 
          component={Dashboard} exact />


        <Route path="/dashboard/all-sub-admin/:currentPage?" 
          component={Dashboard} exact />
        
        <Route path="/dashboard/all-user/:currentPage?" 
          component={Dashboard} exact />

        <Route path="/dashboard/sub-admin-profile/:adminId" 
          component={Dashboard} exact />  
        
        <Route path="/dashboard/comments/:currentPage?" 
          component={Dashboard} exact />

      </Switch>
      </Router>
    </>
  )
}

export default App
