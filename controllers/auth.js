import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const register=async (req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            occupation,
            impressions,
            picturePath,
            viewedProfile,
            location
        }=req.body;

        const salt=await bcrypt.genSalt();
        console.log(password)
        const passwordHash=await bcrypt.hash(password,salt);

        const newuser= new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            friends,
            occupation,
            impressions:Math.floor(Math.random()*1000),
            picturePath,
            viewedProfile:Math.floor(Math.random()*1000),
            location
        })
       const savedUser= await newuser.save();
       res.status(201).json(savedUser);
        
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

// loggin in --------------------------------------------------------------------------

export const login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email:email});
        !user && res.status(400).json({msg:"user not found"});
        const isMatch= await bcrypt.compare(password,user.password);
        !isMatch && res.status(400).json({msg:"please enter valid credentials"});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user})
    } catch (error) {
        res.status(500).json({err:error})
        
    }
}