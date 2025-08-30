import axios from "axios";


export const get_jobs = () => async (dispatch) => {
    try {
        // console.log('okko');
        const response = await axios.get(`/rest-api/get-jobs`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
        dispatch({
            type: 'DASHBOARD_JOB_GET_SUCCESS',
            payload: {
                allJob: response.data.allJob,
                // allCategory: response.data.allCategory
            }
        });

    } catch (error) {
            console.log(error.response);
    }
}


export const get_todos = () => async (dispatch) => {
    try {
        // console.log('okko');
        const response = await axios.get(`/rest-api/get-todos`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
        dispatch({
            type: 'DASHBOARD_TODOS_GET_SUCCESS',
            payload: {
                allToDos: response.data.allToDos,
                // allCategory: response.data.allCategory
            }
        });

    } catch (error) {
            console.log(error.response);
    }
}

export const add_todo = (data) => async (dispatch) => {
    console.log(data);
    dispatch({
        type: 'SET_LOADER',
    })

    try {
        const response = await axios.post('/rest-api/add-todo', 
            data,
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'TODO_ADD_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
        
    } catch (error) {
        // console.log(error.response);
        dispatch({
            type: 'TODO_ADD_FAIL',
            payload: {
                errorMessage: error.response.data.errorMessage
            }
        })
    }

}



export const getAllToDoList = () => async (dispatch)  => {
    try {
        // console.log('okko');
        const response = await axios.get(`/rest-api/get-todolist`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
        dispatch({
            type: 'DASHBOARD_TODOS_GET_SUCCESS',
            payload: {
                // allToDo: response.data,
                // allToDos: response.data
                 allToDos: response.data.allToDos
                // allToDo: response.data.allToDo,
                // allCategory: response.data.allCategory
            }
        });

    } catch (error) {
            console.log(error.response);
    }
}

