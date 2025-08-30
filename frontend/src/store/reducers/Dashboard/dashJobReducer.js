
const jobState = {
    loader: false,
    jobError: '',
    jobSuccessMessage: '',
    allJob: []
}

export const dashJobReducer = (state=jobState, action) => {
    const {payload, type} = action;
    if(type === 'SET_LOADER'){
        return {
            ...state,
            loader: true
        }
    }
    if(type === 'JOB_ADD_SUCCESS'){ 
        return {
            ...state,
            loader: false,
            jobSuccessMessage: payload.successMessage,
            jobError: ''
        }
    }
    if(type === 'DASHBOARD_JOB_GET_SUCCESS') {
        // console.log(payload);
        return {
            ...state,
            allJob: payload.allJob,
            // perPage: payload.perPage,
            // taskCount: payload.taskCount,
            // getTasks: payload.getTasks,
            // taskList: payload.taskList
        }
    }
    if(type === 'JOB_SUCCESS_MESSAGE_CLEAR'){
        return {
            ...state,
            jobSuccessMessage: ''
        }
    }
    if(type === 'JOB_ERROR_MESSAGE_CLEAR'){
        return {
            ...state,
            jobError: ''
        }
    }
    if(type === 'JOB_ADD_FAIL'){
        return {
            ...state,
            loader: false,
            jobError: payload.error,
            jobSuccessMessage: ''
        }
    } 
    return state;
}