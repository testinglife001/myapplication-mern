const {Schema,model} = require('mongoose');

const todoListSchema = new Schema({
    todoName : {
        type : String,
        required : true
    },
    todoSlug : {
        type : String,
        required : true,
         unique: true
    },
    adminId: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    
    jobId: {
        type: String,
        required: true
    },
    jobName: {
        type: String,
        // required: true
    },
    
    todoBody : {
        type : String,
        required : true
    },
    parentId: {
        type: String
    }
},{timestamps:true});

module.exports = model('todoList', todoListSchema);

