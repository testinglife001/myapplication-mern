
const todoState = {
    loader: false,
    allJob: [],
    allToDos: [],
    allToDoLists: [],
    todoError: '',
    todoSuccessMessage: '',
    allToDo: []
}

export const dashToDoReducer = (state=todoState, action) => {
    const {payload, type} = action;
    if(type === 'DASHBOARD_JOB_GET_SUCCESS'){
        return {
            ...state,
            allJob: payload.allJob,
            // allCategory: payload.allCategory
        }
    } 
    if(type === 'DASHBOARD_TODOS_GET_SUCCESS'){
        // console.log(payload);
        // console.log(payload.allToDo);
        // console.log(payload.allToDos);
        return {
            ...state,
            // allToDo: payload,
             allToDos: payload.allToDos,
            // allToDos: payload.allToDos,
            // allCategory: payload.allCategory
        }
    } 
    if(type === 'SET_LOADER'){
        return {
            ...state,
            loader: true
        }
    }
    if(type === 'TODO_ADD_SUCCESS'){ 
        return {
            ...state,
            loader: false,
            todoSuccessMessage: payload.successMessage,
            todoError: ''
        }
    }
    if(type === 'DASHBOARD_TODO_GET_SUCCESS') {
        // console.log(payload);
        return {
            ...state,
            allToDo: payload.allToDo,
            // perPage: payload.perPage,
            // taskCount: payload.taskCount,
            // getTasks: payload.getTasks,
            // taskList: payload.taskList
        }
    }
    if(type === 'TODO_SUCCESS_MESSAGE_CLEAR'){
        return {
            ...state,
            todoSuccessMessage: ''
        }
    }
    if(type === 'TODO_ERROR_MESSAGE_CLEAR'){
        return {
            ...state,
            todoError: ''
        }
    }
    if(type === 'TODO_ADD_FAIL'){
        return {
            ...state,
            loader: false,
            todoError: payload.error,
            todoSuccessMessage: ''
        }
    } 
    return state;
}