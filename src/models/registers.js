const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },  
    phone:{
        type:Number,
        required:true,
        unique:true
    },  
    psw:{
        type:Number,
        required:true
    },  
    pswrepeat:{
        type:Number,
        required:true
    }  
}) 


// now we need to create a collection 

const Register = new mongoose.model("Register",employeeSchema);

module.exports =  Register;