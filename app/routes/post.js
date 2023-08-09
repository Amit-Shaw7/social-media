import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";
import validateCreatePost from "../controllers/posts/validators/validateCreatePost.js";
import createPost from "../controllers/posts/createPost.js";
import validateUpdatePost from "../controllers/posts/validators/validateUpdatePost.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import verifyUserForPost from "../middleware/authorization/verifyUserForPost.js";
import updatePost from "../controllers/posts/updatePost.js";
import getPostsForExploreTrending from "../controllers/posts/getPostsForExploreTrending.js";
import getPostsForExploreOldest from "../controllers/posts/getPostsForExploreOldest.js";
import getPostsForExploreLatest from "../controllers/posts/getPostsForExploreLatest.js";
import getPostsForFeedTrending from "../controllers/posts/getPostsForFeedTrending.js";
import getPostsForFeedLatest from "../controllers/posts/getPostssForFeedLatest.js";
import getPostsForFeedOldest from "../controllers/posts/getPostsForFeedOldest.js";
import validateLikeDislikePost from "../controllers/posts/validators/validateLikeDislikePost.js";
import likePost from "../controllers/posts/likePost.js";
import dislikePost from "../controllers/posts/dislikePost.js";
import savePost from "../controllers/posts/savePost.js";
import validateSavePost from "../controllers/posts/validators/validateSavePost.js";
import deletePost from "../controllers/posts/deletePost.js";
const PostRouter = express.Router();


PostRouter.get("/explore/trending",
    getPostsForExploreTrending
);
PostRouter.get("/explore/oldest",
    getPostsForExploreOldest
);
PostRouter.get("/explore/latest",
    getPostsForExploreLatest
);

// requires authentications
PostRouter.get("/feed/trending",
    isLoggedIn,
    checkUserPresent,
    getPostsForFeedTrending
);
PostRouter.get("/feed/latest",
    isLoggedIn,
    checkUserPresent,
    getPostsForFeedLatest
);
PostRouter.get("/feed/oldest",
    isLoggedIn,
    checkUserPresent,
    getPostsForFeedOldest
);

PostRouter.post("/",
    validateCreatePost,
    isLoggedIn,
    createPost
);


PostRouter.patch("/like/:postId",
    validateLikeDislikePost,
    isLoggedIn,
    likePost
);

PostRouter.patch("/dislike/:postId",
    validateLikeDislikePost,
    isLoggedIn,
    dislikePost
);

PostRouter.patch("/save/:postId",
    validateSavePost,
    isLoggedIn,
    savePost
);


PostRouter.patch("/:postId",
    validateUpdatePost,
    isLoggedIn,
    checkUserPresent,
    verifyUserForPost,
    updatePost
);
PostRouter.delete("/:postId",
    validateUpdatePost,
    isLoggedIn,
    checkUserPresent,
    verifyUserForPost,
    deletePost
);



export default PostRouter