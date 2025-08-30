import axios from "axios";

export const add_task = (data) => async (dispatch) => {
    // console.log(data);
    dispatch({type: 'SET_LOADER'});  
    try {
        const response = await axios.post('/rest-api/add-task', data,
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
        })
    } catch (error) {
        // console.log(error.response.data);
        dispatch({
            type: 'TASK_ADD_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
   // console.log(data); 
}

export const addTask = (data) => {
    return async (dispatch) => {
         const res = await axios.post('/rest-api/task/create',data,
        // const res = await axios.post('/rest-api/add-task',data,
        {
            withCredentials: true
        }
        );
         console.log(res);
        dispatch({
            type: 'ADD_NEW_TASK_SUCCESS',
            payload: {
                //successMessage: res.data.successMessage,
                task: res.data.task
            }
        })
    }
}




export const get_all_task = (page, searchValue) => async (dispatch) => {
    try {
        // console.log(page);
        const response = await axios.get(`/rest-api/get-task?page=${page}&&searchValue=${searchValue}`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data); 
        dispatch({
            type: 'DASHBOARD_TASK_GET_SUCCESS',
            payload: {
                allTask: response.data.allTask,
                perPage: response.data.perPage,
                taskCount: response.data.taskCount
            }
        });
    } catch (error) {
            console.log(error.response);
    }
}

export const get_task = () => async (dispatch) => {
    try {
        // console.log(page);
        const response = await axios.get('/rest-api/get-all-task', 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data); 
            dispatch({
                type: 'DASHBOARD_TASK_GET_SUCCESS',
                payload: {
                    allTask: response.data.allTask,
                    getTasks: response.data.getTasks
                }
            });
    } catch (error) {
        console.log(error.response);
    }
}

export const add_subtask = (data) => async (dispatch) => {
    // console.log(data.get('subtaskName'));

    dispatch({type: 'SET_LOADER'});
    
    try {
        const response = await axios.post('/rest-api/add-subtask', data,
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
        })
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

export const getAllTask = () => async (dispatch) => {
    /*
    return async dispatch => {
        const res = await axios.get('/rest-api/gettask',
                {
                    withCredentials: true
                }
            );
        console.log(res);
    }
    */

    try {
        const response = await axios.get('/rest-api/gettask', 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
            dispatch({
                type: 'DASHBOARD_TASK_GET_SUCCESS',
                payload: {
                    allTask: response.data.allTask,
                    getTasks: response.data.getTasks,
                    taskList: response.data.taskList
                }
            }); 
    } catch (error) {
        console.log(error.response);
    }

}

export const delete_task = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`/rest-api/delete-task/${id}`, 
                {
                    withCredentials: true
                }
            );
        dispatch({
            type: 'TASK_DELETE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
    } catch (error) {
        console.log(error.response);
    }
}


export const edit_task = (taskSlug) => async (dispatch) => {
    // console.log(taskSlug);
    try {
        const response = await axios.get(`/rest-api/edit-task/${taskSlug}`, 
                {
                withCredentials: true
                }
            );
        // console.log(response.data);
        dispatch({
            type: 'EDIT_TASK_GET_SUCCESS',
            payload: {
                editTask: response.data.editTask
            }
        });
        dispatch({
            type: 'EDIT_REQUEST_SET'
        })

    } catch (error) {
        console.log(error.response);
    }
}


export const update_task = (id, data) => async (dispatch) => {
    // console.log(taskSlug);
    try {
        const response = await axios.patch(`/rest-api/update-task/${id}`,
                data, 
                {
                withCredentials: true
                }
            );
        // console.log(response.data);
        dispatch({
            type: 'TASK_UPDATE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        });

    } catch (error) {
        // console.log(error.response);
        dispatch({
            type: 'TASK_UPDATE_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
}

export const upddateTasks = (form) => {
    return async (dispatch) => {
        const res = await axios.post('/rest-api/task/update',form,
        {
            withCredentials: true
        }
        );
        if(res.status === 201){
            console.log(res);
        }
        else{
            console.log(res);
        }
    }
}

