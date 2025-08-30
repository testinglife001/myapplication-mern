const initState = {
    loader: false,
    taskManageError: '',
    taskManageSuccessMessage: '',
    allUser: [],
    allTaskManage: [],
    taskManageCount: 0
}


export const taskManagerReducer = (state = initState,action) => {
    const {type, payload} =action;
    if(type === 'HOME_USERS_GET_SUCCESS'){
        return {
            ...state,
            allUser: payload.allUser
        }
    }
    if(type === 'TASK_ADD_SUCCESS'){
        return {
            ...state,
            loader: false,
            taskManageSuccessMessage: payload.successMessage,
            taskManageError: ''
        }
    }
    if(type === 'TASK_ADD_FAIL'){
        return {
            ...state,
            loader: false,
            taskManageError: payload.error,
            taskManageSuccessMessage: ''
        }
    }
    if(type === 'TASK_GET_SUCCESS'){
        // console.log(payload.allTaskManage)
        return {
            ...state,
            allTaskManage: payload.allTaskManage
        }
    }
    if(type === 'TASK_DUPLICATE_SUCCESS'){
        // console.log(payload.allTaskManage)
        return {
            ...state,
            taskManageSuccessMessage: payload.successMessage
        }
    }

    return state;
}

