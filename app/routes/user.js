import express from "express";
import getUserProfile from '../controllers/user/getsUerProfile.js';
import { isLoggedIn } from '../middleware/authorization/isLoggedIn.js';
import validateUpdateProfile from "../controllers/user/validators/validateUpdateProfile.js";
import updateProfile from "../controllers/user/updateProfile.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import validateFollowUnfollowUser from "../controllers/user/validators/validateFollowUnfollowUser.js";
import followUser from "../controllers/user/followUser.js";
import unfollowUser from "../controllers/user/unfollowUser.js";
import searchUser from "../controllers/user/searchUser.js";

const UserRouter = express.Router();


UserRouter.get("/search",
    searchUser
);

// Authentication required 

UserRouter.get("/profile",
    isLoggedIn,
    checkUserPresent,
    getUserProfile
);

UserRouter.patch("/profile",
    validateUpdateProfile,
    isLoggedIn,
    checkUserPresent,
    updateProfile
);

UserRouter.patch("/follow/:userId",
    validateFollowUnfollowUser,
    isLoggedIn,
    checkUserPresent,
    followUser
);

UserRouter.patch("/unfollow/:userId",
    validateFollowUnfollowUser,
    isLoggedIn,
    checkUserPresent,
    unfollowUser
);

export default UserRouter;