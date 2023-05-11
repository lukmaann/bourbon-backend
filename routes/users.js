import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const Router=express.Router();

// Read requirements-------------------------------------
Router.get("/:id",verifyToken,getUser);
Router.get("/:id/friends",verifyToken,getUserFriends);
 

// update requirements-----------------------------------

Router.patch("/:id/:friendsId",addRemoveFriends);

export default Router;



