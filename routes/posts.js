import express from "express"
import { verifyToken } from "../middleware/auth.js"
import {getUserPost,getFeedPost,likePost} from "../controllers/posts.js"


const Router =express.Router();



// -------------------get-------------------------
Router.get('/',verifyToken,getFeedPost);
Router.get('/:id/posts',verifyToken,getUserPost);

// ---------------------update-----------------------
Router.patch('/:id/like',verifyToken,likePost)

export default Router;