import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
    },
    gender : {
        type : String,
        enum: ['male' , "female"],
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    crieteAt :{
        type : Date,
        default : Date.now
    }
})

const userModel = mongoose.model("user" , userSchema)

export default userModel