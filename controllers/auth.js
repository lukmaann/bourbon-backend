import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import User from "../models/user.js";
const {Jwt}=pkg;

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