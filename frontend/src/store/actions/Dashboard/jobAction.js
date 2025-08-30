import axios from "axios";


export const add_job = (data) => async (dispatch) => {
    // console.log(data);

    
    dispatch({type: 'SET_LOADER'});
    
    
    try {
        const response = await axios.post('/rest-api/add-job', data,
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'JOB_ADD_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
    } catch (error) {
        // console.log(error.response.data);
        dispatch({
            type: 'JOB_ADD_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
    

   // console.log(data);
   
}

export const get_job = () => async (dispatch) => {
    try {
        // console.log(page);
        const response = await axios.get('/rest-api/get-job', 
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
                    // getTasks: response.data.getTasks
                }
            });
    } catch (error) {
        console.log(error.response);
    }
}
