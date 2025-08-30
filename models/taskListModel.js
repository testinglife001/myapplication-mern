const {Schema,model} = require('mongoose');

const taskListSchema = new Schema({
    taskName : {
        type : String,
        // required : true
    },
    taskSlug : {
        type : String,
        // required : true,
        // unique: true
    },
    adminId: {
        type: String,
        //required: true
    },
    adminName: {
        type: String,
        // required: true
    },
    taskBody : {
        type : String,
        // required : true
    },
    parentId: {
        type: String
    },
    type: {
        type: String
    }
},{timestamps:true});

module.exports = model('taskList', taskListSchema);

