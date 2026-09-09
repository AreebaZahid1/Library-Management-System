const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    number:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        required: true,
    },
// forget password
    resetOTP: {
       type: String,
    },
    resetOTPExpire: {
       type: Date,
    },
})


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;