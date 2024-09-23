const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        
    },
    userEmail: {
        type: String,
        
     },
    userPassword: {
        type: String,
        
    },
    userImage: {
        type: String
        
    },
    userRole: {
        type: String,        
        enum:["admin","user"],
        default:"user"
    },
    
})

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;