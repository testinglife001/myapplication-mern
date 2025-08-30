const jobModel = require("../../models/jobModel");
const todoListModel = require("../../models/todoListModel");
const slugify = require('slugify');



module.exports.getAllJobs = async (req, res) => {
    // console.log('res');
    try {
        const allJob = await jobModel.find({});
        res.status(200).json({
            allJob
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
}

module.exports.todo_get_all = async (req, res) => {
    // console.log('res');
    try {
        // const allToDos = await todoListModel.find({});
         const allToDos = await todoListModel.find({}).where({'parentId':''});
        res.status(200).json({
            allToDos
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
}



module.exports.addToDoList = async (req, res) => {
    // console.log('call');
    // console.log(req);
    
    const {adminId, adminName} = req;
     const { todoName, todoBody, job, todo } = req.body;

    const todoListObj = {
        todoName: req.body.todoName,
        todoSlug: slugify(req.body.todoName),
        todoBody: req.body.todoBody,
        jobId: req.body.job,
        adminId,
        adminName
    }

    if (req.body.todo){
        todoListObj.todo = req.body.todo;
    }

    const error = {};

    //  console.log(req.body);

    
    if (!todoName) {
        error.todoName = 'Please provide todo name';
    }
    if (!todoBody) {
        error.todoBody = 'Please provide todo description';
    }
    if (!job) {
        error.job = 'Please provide job';
    }

    if (Object.keys(error).length == 0) {
        const todoSlug = todoName.trim().split(' ').join('-');
        try {
            const checkToDo = await todoListModel.findOne({ todoSlug });
            if(checkToDo){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added todo'
                    }
                })
            } else {
                await todoListModel.create({
                    todoName: todoName.trim(),
                    todoSlug,
                    todoBody,
                    adminId,
                    adminName,
                    jobId: job,
                    parentId: todo
                })
                res.status(201).json({
                    successMessage: 'Todo add successfull'
                })
            }
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }
    } else {
        res.status(404).json({ errorMessage: error });
    }


}


function createToDoLists(allToDoLists, parentId=null){
    const todoList = [];
    let todo;
    if(parentId==null){
        todo = allToDoLists.filter(todo=>todo.parentId==undefined);
    }else{
        todo = allToDoLists.filter(todo=>todo.parentId==parentId);
    }
    for(let td of todo){
        todoList.push({
            _id: td._id,
            todoName:td.todoName,
            todoSlug: td.todoSlug,
             parentId: td.parentId,
             children: createToDoLists(allToDoLists, td._id)
        });
    }
    return todoList;
}
function createTasks(getToDoLists, parentId = null){
    
    const taskList = [];
    let task;
    if(parentId === null || parentId === ''){
        task = getToDoLists.filter((task) => task.parentId === undefined || task.parentId === null);
    }else{
        task = getToDoLists.filter((task) => task.parentId === parentId);
    }

    for (let tsk of task){
        taskList.push({
            _id: tsk._id,
            todoName: tsk.todoName,
            todoSlug: tsk.todoSlug,
            parentId: tsk.parentId,
            children: createTasks(getToDoLists, tsk._id)
        });
    }

    // console.log(taskList);
    return taskList;

}



module.exports.getToDoLists = async (req, res) => {
    // console.log('res');
    try {
        // const allToDoLists = await todoListModel.find({});
        // let getToDoLists = await todoListModel.find({});
        
        // if(getToDoLists){
        //     const todoList = createToDoLists(getToDoLists);
        //    const todoList = createTasks(getToDoLists);
        //    res.status(200).json({ todoList });
        // }

        // console.log(getToDoLists);
        // console.log(todoList);
        
        // res.status(200).json({
        //     allToDoLists,
        //     getToDoLists,
        //     todoList
        // });

        const allToDos = await todoListModel.find({});
        res.status(200).json({
            allToDos
        });

    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
}

