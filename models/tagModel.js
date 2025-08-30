const {Schema,model} = require('mongoose');

const tagSchema = new Schema({
    tagName : {
        type : String,
        required : true
    },
    tagSlug : {
        type : String,
        required : true
    },
    tagBody : {
        type : String,
        required : true
    }
},{timestamps:true});

module.exports = model('tag', tagSchema);

