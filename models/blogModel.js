const {Schema,model} = require('mongoose');

const blogSchema = new Schema({
    title:{ 
        type:String,
        required:true
    },
    blogSlug : {
        type : String,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    creator: {
        type: Schema.Types.ObjectId,   // Reference to the User model
        ref: 'user',
        required: true 
    },
    avatar:{
        public_id: {
          type: String,
          required: false
        },
        url: {
          type: String,
          required: false
        },
    },
    cover: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
    features: {
        type: [String],
        required: false,
    },
},{timestamps:true});

module.exports = model('blog',blogSchema);

