const {Schema,model} = require('mongoose');


const categoryListSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      type: {
        type: String,
        required: false
      },
      categoryImage: { 
        type: String,
        required: false 
    },
      parentId: {
        type: String,
        // required: true,
        default: null
      },
    /*  
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    */
    },
    
    { timestamps: true }
  );

module.exports = model('categoryList',categoryListSchema);

