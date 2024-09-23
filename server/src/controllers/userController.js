const router = require('express').Router();
const userModel = require('../modals/userModel');

const getUser = async(req,res)=>{
    try{
    const users = await userModel.find();
    res.status(200).json({
        message: "Users fetched successfully",
        users: users    
    });
}catch (err){
    res.status(400).send(err);
}
};

const createUser = async(req,res)=>{
    console.log(req.body);    
    const user = new userModel (req.body);
    console.log(user);    
    try{
        const savedUser = await user.save();
        res.status(201).json({
            message: "User saved successfully",
            savedUser: savedUser
        })
    }catch (err){
        res.status(400).send(err);
    }
};

const updateUser = async(req,res)=>{
    console.log(req.body);
    const{  
        _id,      
        userName,
        userEmail,
        userPassword,
        userImage,
        userRole         
    } = req.body;
     
    const updateUser = await userModel.findByIdAndUpdate(
        _id,
        {
        userName,
        userEmail,
        userPassword,
        userImage,
        userRole            
        },
        {new: true}
    );

    if(updateUser){
        return res.status(200).json({
            message: "User updated successfully",
            updateUser: updateUser
        })
    }
}; 

const deleteUser = async(req,res)=>{
  try{
    const id = req.params.id;
    console.log("ID TO DELETE",id);

   await User.findByIdAndDelete(id);
   const updatedUsers =await userModel.find() ;

    return res.status(200).json({message:"Delete success",updatedUsers:updatedUsers});
  }
  catch{
    res.status(400).json({message:"Error in server"});
  }
};

module.exports ={ 
    getUser,
    createUser,
    updateUser,
    deleteUser
} 