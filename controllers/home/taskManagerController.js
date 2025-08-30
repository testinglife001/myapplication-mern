const taskManagerModel = require("../../models/taskManagerModel")
const userModel = require("../../models/userModel")



module.exports.user_get_all = async (req,res) => {
    // console.log("ok");
    
    try {
        const allUser = await userModel.find({});
        // const allCategory = await categoryModel.find({});
        res.status(200).json({
            allUser
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
    
}


module.exports.add_task_manager = async (req,res) => {
    // console.log('res');
    // console.log(req);

    
    try {
        
         
        const { userId } = req;
        const { title, team, stage, date, priority, assets } = req.body;

        // console.log(userId);
        // console.log(req.body);

        
        let text = "New task has been assigned to you";
            if (team?.length > 1) {
                text = text + ` and ${team?.length - 1} others.`;
            }

        text =
            text +
            ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
                date
            ).toDateString()}. Thank you!!!`;
        
        const activity = {
            type: "assigned",
            activity: text,
            by: userId,
            };

        const task = await taskManagerModel.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: activity,
        });
        
        res.status(200).json({ status: true, task, message: "Task created successfully." });
        

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
    

}

module.exports.duplicate_task_manager = async (req,res) => {
    
    try {
        const { id } = req.params;

    const task = await taskManagerModel.findById(id);

    const newTask = await taskManagerModel.create({
      ...task,
      title: task.title + " - Duplicate",
    });

    newTask.team = task.team;
    newTask.subTasks = task.subTasks;
    newTask.assets = task.assets;
    newTask.priority = task.priority;
    newTask.stage = task.stage;

    await newTask.save();

    //alert users of the task
    let text = "New task has been assigned to you";
    if (task.team.length > 1) {
      text = text + ` and ${task.team.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${
        task.priority
      } priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;
    
      res.status(200).json({ status: true, message: "Task duplicated successfully." });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}

module.exports.post_task_manager_activity = async (req,res) => {

    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { type, activity } = req.body;

        const task = await taskManagerModel.findById(id);

        const data = {
        type,
        activity,
        by: userId,
        };

        task.activities.push(data);

        await task.save();

        res
        .status(200)
        .json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }

}

module.exports.task_manager_get_all = async (req,res) => {
    // console.log(req);

    
    try {
        const { stage, isTrashed } = req.query;

        let query = { isTrashed: isTrashed ? true : false };

        if (stage) {
        query.stage = stage;
        }

        let queryResult = taskManagerModel.find(query)
        .populate({
            path: "team",
            select: "name title email",
        })
        .sort({ _id: -1 });

        const tasks = await queryResult;

        // console.log(tasks);

        res.status(200).json({
        status: true,
        tasks,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
    

}


module.exports.task_manager_get = async (req,res) => {
    
    try {
        const { id } = req.params;

        const task = await taskManagerModel.findById(id)
        .populate({
            path: "team",
            select: "name title role email",
        })
        .populate({
            path: "activities.by",
            select: "name",
        });

        res.status(200).json({
        status: true,
        task,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }

}


module.exports.add_subtask_manager = async (req,res) => {
    // console.log(req.params);
    // console.log('ok');
    
    
    try {
        const { title, tag, date } = req.body;
        // console.log(req);
        // console.log(req.params);
        const { id } = req.params;
        // console.log(id);
        // console.log(req.body);

        
        // const newSubTask = {
        // title,
        // date,
        // tag
        // };
        const newSTArray = req.body;
        /*
        const newSubTask = {           
            title: req.body.title,
            date: req.body.date,
            tag: req.body.tag           
        };
        */

        // console.log(newSubTask);
        // console.log(newSTArray.id);
         console.log(newSTArray);
         console.log(newSTArray.state.title);
        // console.log(req.body.title);

        const newSTask = {
            title: newSTArray.state.title,
            date: newSTArray.state.date,
            tag: newSTArray.state.tag   
        }

         const task = await taskManagerModel.findById(id);

        // task.subTasks.push(newSubTask);
        // task.subTasks.push(newSTArray);
        
        // task.subTasks.push(newSTArray);
         task.subTasks.push(newSTask);
         console.log(task.subTasks);

         await task.save();

        /*
        const cat = new taskManagerModel(
            // categoryObj     
             newSTask
            // {newSTask}
         )
         await cat.save();
        */
         
        
         console.log(newSTArray.id);
         console.log(task);
         console.log(newSTArray.id);
         // console.log({newSubTask});
         
         
         console.log(task.subTasks);
         console.log(newSTArray.id);
         console.log(newSTArray);
         console.log(newSTask);
        // console.log(cat);


         res
         .status(200)
         .json({ status: true, message: "SubTask added successfully." });
        

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
    
    

}


