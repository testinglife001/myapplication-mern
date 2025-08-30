const { model, Schema } = require('mongoose');
// import bcrypt from "bcryptjs";
const bcrypt = require('bcryptjs')
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    title: { 
        type: String, 
        required: false 
    },
    loginMethod: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    accessStatus: {
        type: String,
        default: 'unblock'
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'taskList'
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isAdmin: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
}, { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

  
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = model('user', userSchema)