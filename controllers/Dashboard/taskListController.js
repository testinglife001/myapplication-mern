const taskListModel = require("../../models/taskListModel");
const slugify = require('slugify');
const shortid = require("shortid");
// const taskModel = require("../../models/taskModel")


module.exports.task_add = async (req, res) => {
    // console.log('call');
    // console.log(req);
    
    const {adminId, adminName} = req;
     const { taskName, taskBody } = req.body;

     const error = {};

    //  console.log(req.body);

    
    if (!taskName) {
        error.taskName = 'Please provide task name';
    }
    if (!taskBody) {
        error.taskBody = 'Please provide task description';
    }

    if (Object.keys(error).length == 0) {
        const taskSlug = taskName.trim().split(' ').join('-');
        try {
            const checkTask = await taskListModel.findOne({ taskSlug });
            if(checkTask){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added task'
                    }
                })
            } else {
                await taskListModel.create({
                    taskName: taskName.trim(),
                    taskSlug,
                    taskBody,
                    adminId,
                    adminName
                })
                res.status(201).json({
                    successMessage: 'Task add successfull'
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

module.exports.addTask = async (req, res) => {
    const categoryObj = {
        taskName: req.body.taskName,
        taskSlug:  `${slugify(req.body.name)}-${shortid.generate()}`,
        // taskBody: req.body.taskBody,
        //createdBy: req.user._id,
    };  
    // if (req.file) {
    // categoryObj.categoryImage = "/public/" + req.file.filename;
    // }   
    if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
    }
    // console.log(categoryObj);
    // console.log(categoryObj.parentId);
    // const cat = new Category(categoryObj);
    // cat.save((error, category) => {
    //    if (error) return res.status(400).json({ error });
    //    if (category) {
    //    return res.status(201).json({ category });
    //    }
    // });
    try {
        // const { taskName, parentId } = req.body;
        // const category = new Category({ name, parent: parent || null });
        
        const task = new taskListModel({
            taskName: req.body.taskName,
            taskSlug: slugify(req.body.taskName),
            parentId: req.body.parentId || null
        })
        await task.save();
        res.status(201).json(task);
        
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}


module.exports.task_get = async (req, res) => {
    // console.log(req);
    const { page, searchValue } = req.query;
    const perPage = 8;
    const skipPage = parseInt(page - 1) * perPage;
    if (searchValue === 'undefined' || !searchValue) {
        try {
            const taskCount = await taskListModel.find({}).countDocuments();
            // console.log(tagCount);
            const getTask = await taskListModel.find({}).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
            // console.log(getTag);
            res.status(200).json({
                allTask: getTask,
                perPage,
                taskCount
            });
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            });            
        }
    } else {
        try {
            const taskCount = await taskListModel.find({}).countDocuments();
            let getTask = await taskListModel.find({});
            getTask = getTask.filter(t => t.taskName.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
            res.status(200).json({
                allTask: getTask,
                perPage,
                taskCount
            });
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            }); 
        }
    }
}

module.exports.task_get_all = async (req, res) => {
    // console.log('res');
    try {
        const allTask = await taskListModel.find({}).where({'parentId':null});
        res.status(200).json({
            allTask
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
}

module.exports.subtask_add = async (req, res) =>  {

    // console.log('res');
    const {adminId, adminName} = req;
    const { subtaskName, subtaskBody, task } = req.body;
    // console.log(req.body);
    const error = {};

    if (!subtaskName) {
        error.subtaskName = 'Please provide subtask name';
    }
    if (!subtaskBody) {
        error.subtaskBody = 'Please provide subtask description';
    }
    if (!task) {
        error.task = 'Please provide task name';
    }

    if (Object.keys(error).length == 0) {
        const subtaskSlug = subtaskName.trim().split(' ').join('-');
        try {
            const checkSubTask = await taskListModel.findOne({ subtaskSlug });
            if(checkSubTask){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added subtask'
                    }
                })
            } else {
                await taskListModel.create({
                    taskName: subtaskName.trim(),
                    taskSlug: subtaskSlug,
                    taskBody: subtaskBody,
                    parentId: task,
                    adminId,
                    adminName

                })
                res.status(201).json({
                    successMessage: 'Sub task add successfull'
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


function createTasks(getTask, parentId = null){
    
    const taskList = [];
    let task;
    if(parentId == null){
        task = getTask.filter(task => task.parentId == undefined);
    }else{
        task = getTask.filter(task => task.parentId == parentId);
    }

    for (let tsk of task){
        taskList.push({
            _id: tsk._id,
            taskName: tsk.taskName,
            taskSlug: tsk.taskSlug,
            parentId: tsk.parentId,
            children: createTasks(getTask, tsk._id)
        });
    }

    return taskList;

}

module.exports.getTasks = async (req, res) => {
    /*
    taskModel.find({}).exec((error, tasks) => {
        if(error) return res.status(400).json({ error });
        if(tasks){
            // const taskList = createTasks(tasks);
            res.status(200).json({ tasks });
            // res.status(200).json({ taskList });
        }
    })
    const taskCount = await taskModel.find({}).countDocuments();
            let getTask = await taskModel.find({});
            getTask = getTask.filter(t => t.taskName.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
            res.status(200).json({
                allTask: getTask,
                perPage,
                taskCount
            });
    */

    try {
        // const allTask = await taskModel.find({});
        const taskCount = await taskListModel.find({}).countDocuments();
        let getTask = await taskListModel.find({});
        // const taskList = await taskModel.find({parentId}); 
         if(getTask){
            // res.status(200).json({ allTask });
             const taskList = createTasks(getTask);
             res.status(200).json({ taskList });
            // res.status(200).json({
            //        allTask: getTask,
               
            //     });
         }
        // res.status(200).json({
        //    allTask: getTask,
        //    taskCount: taskCount,
        //     taskList
        // });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }

} 


module.exports.task_delete = async (req, res) => {

}

module.exports.task_edit = async (req, res) => {

}

module.exports.task_update = async (req, res) => {

}


module.exports.addTaskList = async (req, res) => {
    // console.log('call');
    // console.log(req);
    
    const {adminId, adminName} = req;
     const { taskName, taskBody } = req.body;

    /* 
    const taskListObj = {
        taskName: req.body.name,
        taskSlug: slugify(req.body.name),
        taskBody: req.body.body
    }

    if(req.body.parentId){
        taskListObj.parentId = req.body.parentId
    }
    */
    
     const error = {};

    //  console.log(req.body);
    
    if (!taskName) {
        error.taskName = 'Please provide task name';
    }
    if (!taskBody) {
        error.taskBody = 'Please provide task description';
    }

    // const task = new taskListModel(taskListObj);
    // taskList = await task.save();
    /*
    await taskListModel.create({
        taskName: taskName.trim(),
        taskSlug,
        taskBody,
        adminId,
        adminName
    });
    res.status(201).json({
        successMessage: 'Task add successfull'
    })
    */

    if (Object.keys(error).length == 0) {
        const taskSlug = taskName.trim().split(' ').join('-');
        try {
            const checkTask = await taskListModel.findOne({ taskSlug });
            if(checkTask){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added task'
                    }
                })
            } else {
                await taskListModel.create({
                    taskName: taskName.trim(),
                    taskSlug,
                    taskBody,
                    adminId,
                    adminName
                })
                res.status(201).json({
                    successMessage: 'Task add successfull'
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


module.exports.updateTasks = async (req, res) => {
    const { _id, taskName, parentId, type } = req.body;
    const updatedTasks = [];
    if (taskName instanceof Array) {
        for (let i = 0; i < taskName.length; i++) {
            const task = {
              taskName: taskName[i],
              type: type[i],
            };
            if (parentId[i] !== "") {
              task.parentId = parentId[i];
            }
      
            const updatedTask = await taskListModel.findOneAndUpdate(
              { _id: _id[i] },
                task,
              { new: true }
            );
            updatedTasks.push(updatedTask);
        }
        return res.status(201).json({ updateTasks: updatedTasks });
    }
    else {
        const task = {
            taskName,
            type,
          };
          if (parentId !== "") {
            task.parentId = parentId;
          }
          const updatedTask = await taskListModel.findOneAndUpdate({ _id }, task, {
            new: true,
          });
        return res.status(201).json({ updatedTask });
    }
}



