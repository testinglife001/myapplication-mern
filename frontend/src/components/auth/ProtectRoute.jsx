import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectRoute = ({path,component,exact}) => {
  
    const {userInfo} = useSelector(state => state.adminReducer);
    // console.log(userInfo);
    
    if(!userInfo){
        return <Redirect to='/admin/login' />
    } else {
        if ( userInfo.role === 'admin' || userInfo.role === 'superadmin' ){
            if(userInfo.role === 'admin'){
                return <Route path={path} component={component} exact={exact} />
            }else{
                if(userInfo.accessStatus === 'block'){
                    return <Redirect to='/user/block' />
                } else{
                    return <Route path={path} component={component} exact={exact} />
                }
            }
        }else {
            if(userInfo.accessStatus === 'block'){
                return <Redirect to='/user/block' />
            } else{
                return <Redirect to='/' />
            }
        }
        // return <Route path={path} component={component} exact />
    }

}

export default ProtectRoute