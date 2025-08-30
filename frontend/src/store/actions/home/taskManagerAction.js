import axios from "axios"


export const get_all_user = () => async (dispatch) => {
    try {
        // console.log('okko');
        const response = await axios.get('/rest-api/get-all-user', 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
         dispatch({
            type: 'HOME_USERS_GET_SUCCESS',
            payload: {
                allUser: response.data.allUser
            }
         });

    } catch (error) {
            // console.log(error.response);
    }
}


export const add_task_manager = (data) => async (dispatch) => {
    // console.log(data.get('title'));
     dispatch({type: 'SET_LOADER'});
    try {
        const response = await axios.post(`/rest-api/add-task-manager`, 
             data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
            
            dispatch({
                type: 'TASK_ADD_SUCCESS',
                payload: {
                    successMessage: response.data.successMessage
                }
             });
            
    } catch (error) {
        // console.log(error.response);
        
        dispatch({
            type: 'TASK_ADD_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
        
    }

}


export const duplicate_task_manager = (id) => async (dispatch) => {
    // dispatch({type: 'SET_LOADER'});
    // console.log(id);
    
    try {
        const response = await axios.post(`/rest-api/duplicate-task-manager/${id}`, 
            // data,
                {
                    withCredentials: true
                }
            );
             console.log(response.data);
            
            dispatch({
                type: 'TASK_DUPLICATE_SUCCESS',
                payload: {
                    successMessage: response.data.successMessage
                }
             });
            
    } catch (error) {
        console.log(error.response);
    }
    

}

export const task_manager_activity = (data) => async (dispatch) => {

    try {
        const response = await axios.post(`/rest-api/task-manager-activity`, 
             data,
                {
                    withCredentials: true
                }
            );
             console.log(response.data);
            /*
            dispatch({
                type: 'TASK_ADD_SUCCESS',
                payload: {
                    successMessage: response.data.successMessage
                }
             });
             */
    } catch (error) {
        
    }

}

export const get_all_task_manager = (strQuery,isTrashed,search) => async (dispatch) => {

    try {
        const response = await axios.get(`/rest-api/get-all-task-manager?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
            
            dispatch({
                type: 'TASK_GET_SUCCESS',
                // payload: response.data
                 payload: {
                    allTaskManage: response.data
                 }
             });
             
    } catch (error) {
        console.log(error.response);
    }

}

export const get_task_manager = (data) => async (dispatch) => {

    try {
        const response = await axios.get(`/rest-api/get-task-manager`, 
             data,
                {
                    withCredentials: true
                }
            );
             console.log(response.data);
            /*
            dispatch({
                type: 'TASK_ADD_SUCCESS',
                payload: {
                    successMessage: response.data.successMessage
                }
             });
             */
    } catch (error) {
        
    }

}


export const add_subtask_manager = (data) => async (dispatch) => {
    // console.log(data.id);
    // console.log(data);

    
    try {
        const response = await axios.put(`/rest-api/add-subtask-manager/${data.id}`, 
             data,
                {
                    withCredentials: true
                }
            );
             console.log(response.data);
            /*
            dispatch({
                type: 'TASK_ADD_SUCCESS',
                payload: {
                    successMessage: response.data.successMessage
                }
             });
             */
     } catch (error) {
         console.log(error);
     }

}


export const add_user = (data) => async (dispatch) => {
    // console.log(data);
    // dispatch({type: 'SET_LOADER'});
    
    try {
        const response = await axios.post('/rest-api/register', 
             data,
                {
                    withCredentials: true
                }
            );
             console.log(response.data);
            // console.log(response);
            /*
            dispatch({
                type: 'TASK_ADD_SUCCESS',
                payload: {
                    successMessage: response.data.successMessage
                }
             });
            */
           
     } catch (error) {
         console.log(error.response);
        /*
        dispatch({
            type: 'TASK_ADD_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
        */
        
     }

}

