import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true,
        min:5,
       
    },
    friends:{
        type:Array,
        default:[]
        
    },
    picturePath:{
        type:String,
        default:""
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number

},{timestamps:true});

const User=mongoose.model("user",UserSchema);


export default User;