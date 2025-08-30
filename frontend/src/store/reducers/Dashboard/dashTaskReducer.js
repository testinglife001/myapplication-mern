
const taskState = {
    loader: false,
    taskError: '',
    taskSuccessMessage: '',
    allTask: [],
    taskList: [],
    perPage: 0,
    taskCount: 0,
    editTask: '',
    editRequest: false,
    getTasks: [],
    subtaskError: ''
}

const buildNewTasks = (parentId, taskList, task) => {
    let myTasks = [];

    
    if(parentId == undefined){
        return [
            ...taskList,
            {
                _id: task._id,
                taskName: task.taskName,
                taskSlug: task.taskSlug,
                // type: category.type,
                children: []
            }
        ];
    }
    
    
    for(let tsk of taskList){

        if(tsk._id == parentId){
            const newTask = {
                _id: task._id,
                taskName: task.taskName,
                taskSlug: task.taskSlug,
                parentId: task.parentId,
                // type: task.type,
                children: []
            };
            myTasks.push({
                ...tsk,
                children: tsk.children.length > 0 ? [...tsk.children, newTask] : [newTask]
            })
        }else{
            myTasks.push({
                ...tsk,
                children: tsk.children ? buildNewTasks(parentId, tsk.children, task) : []
            });
        }

        
    }


    return myTasks;
}

export const dashTaskReducer = (state=taskState, action) => {
    const {payload, type} = action;
    if(type === 'SET_LOADER'){
        return {
            ...state,
            loader: true
        }
    }
    if(type === 'TASK_ADD_SUCCESS' || type === 'TASK_DELETE_SUCCESS' || type === 'TASK_UPDATE_SUCCESS'){
        return {
            ...state,
            loader: false,
            taskSuccessMessage: payload.successMessage,
            taskError: ''
        }
    }
    if(type === 'ADD_NEW_TASK_SUCCESS'){
        const task = action.payload.task;
        console.log(task.parentId);
        // const updatedTasks = buildNewTasks(task.parentId,state.taskList,task);
        // console.log(updatedTasks);
        return {
            ...state,
            loader: true,
            // allTask: 
            // taskList: payload.taskList
        }
    }
    if(type === 'DASHBOARD_TASK_GET_SUCCESS') {
        // console.log(payload);
        return {
            ...state,
            allTask: payload.allTask,
            perPage: payload.perPage,
            taskCount: payload.taskCount,
            getTasks: payload.getTasks,
            taskList: payload.taskList
        }
    }
    if(type === 'EDIT_TASK_GET_SUCCESS') {
        return {
            ...state,
            editTask: payload.editTask 
        }
    }
    if(type === 'EDIT_REQUEST_SET') {
        return {
            ...state,
            editRequest: true
        }
    }
    if(type === 'TASK_SUCCESS_MESSAGE_CLEAR'){
        return {
            ...state,
            taskSuccessMessage: ''
        }
    }
    if(type === 'EDIT_REQUEST_CLEAR') {
        return {
            ...state,
            editRequest: false
        }
    }
    if(type === 'TASK_ERROR_MESSAGE_CLEAR'){
        return {
            ...state,
            taskError: ''
        }
    }
    if(type === 'TASK_ADD_FAIL' || type === 'TASK_UPDATE_FAIL'){
        return {
            ...state,
            loader: false,
            taskError: payload.error,
            taskSuccessMessage: ''
        }
    } 
   
    return state;
}
    
