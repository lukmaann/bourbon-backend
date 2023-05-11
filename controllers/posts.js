import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost=async(req,res)=>{
    try {
        const {userId,description,picturePath}=req.body;

        const user=await User.findById(userId);
        const newPost=new Post({
            userId,
            description,
            picturePath,
            firstName:user.firstName,
            lastName:user.lastName,
            userPicturePath:user.picturePath,
            likes:{

            },
            comments:[]
        })
         await newPost.save();

         const post= await Post.find();
         res.status(201).json(post)
        

        
    } catch (error) {
        res.status(409).json({err:error})
    }
}


// Read---------------------------------------------------------

export const getFeedPost=async(req,res)=>{
    try {
        const post=await Post.find();
        res.status(200).json(post)
        
    } catch (error) {
        res.status(409).json({err:error})
        
    }
}

export const getUserPost=async (req,res)=>{
    try {
        const {userId}=req.body;
     
        const post= await user.posts.find({userId});
        res.status(200).json(post)
    } catch (error) {
        res.status(409).json({err:error})
    }
}


// update---------------------------------------------
export  const likePost=async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId}=req.body;

        const post=await Post.findById(id);
        const isLiked=post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }

        const updatedPost=await Post.findByIdAndUpdate(
            id,{likes:post.likes},
            {new:true}
        )
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(409).json({msg:error})
    }
    



}

