const mongoose = require ('mongoose');

const contactScheema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please add the contact's name"],
    },
    email:{
        type:String,
        required:[true, "Please add the contact's email"],
    },
    phone:{
        type: String,
        required:[true, "Please add the contact's phone number"],
    },
},
{
    timestap:true,
})

module.exports=mongoose.model("contactModel", contactScheema);