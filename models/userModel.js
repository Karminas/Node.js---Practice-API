const mongoose = require ("mongoose");

const userScheema = mongoose.Schema({
    userName:{
        type:String,
        required:[true, "User name is mandatory"],
    },
    email:{
        type:String,
        required:[true, "Email is mandatory"],  
        unique:[true, "This email already exists"],
    },
    password:{
        type:String,
        required:[true, "Please add user password"],
    },
},{timestamp: true,})

module.exports = mongoose.model("user", userScheema);