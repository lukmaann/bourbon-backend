
import User from "../models/user.js";


// Read----------------------------------

export const getUser= async(req,res)=>{
    try {
        const {id}=req.params;
        const user= await User.findById(id);
        
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({err:error.message})
    }
}

// Read-------------------------------------------
export const getUserFriends=async(req,res)=>{
   try {
    const {id}=req.params;
    const user= await User.findById(id);
    const friends=await Promise.all((
        user.friends.map((id)=>User.findById(id))
    ))

    const formattedFriends=friends.map(({_id,firstName,lastName,email,occupation,location,picturePath})=>{
        return {_id,firstName,email,lastName,occupation,location,picturePath}
    })

    res.status(200).json(formattedFriends);




   } catch (error) {
    res.status(404).json({err:error})
   }
}


// Update-------------------------------------------

export const addRemoveFriends=async(req,res)=>{
    try {
        const {id,friendsId}=req.params;

        const user=await User.findById(id);
        const friend=await User.findById(friendsId);

        if(user.friends.include(friendsId)){
            user.friends=user.friends.filter((id)=> id !==friendsId);
            friend.friends=user.friends.filter((id)=> id!==id);
        }else{
            user.friends.push(friendsId);
            friend.friends.push(id);
        }
        user.save();
        friend.save();
        const friends=await Promise.all((
            user.friends.map((id)=>User.findById(id))
        ))
    
        const formattedFriends=friends.map(({_id,firstName,lastName,email,occupation,location,picturePath})=>{
            return {_id,firstName,lastName,email,occupation,location,picturePath}
        })
        res.status(200).json(formattedFriends);

        
        
    } catch (error) {
        res.status(404).json({err:error})
    }
}