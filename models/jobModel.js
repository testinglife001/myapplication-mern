const {Schema,model} = require('mongoose');

const jobSchema = new Schema({
    jobName : {
        type : String,
        required : true
    },
    jobSlug : {
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
    jobBody : {
        type : String,
        required : true
    }
},{timestamps:true});

module.exports = model('job', jobSchema);

