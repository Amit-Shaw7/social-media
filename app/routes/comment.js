import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";

import getPostsForExplore from "../controllers/posts/getPostsForExplore.js";
import validateAddComment from "../controllers/comment/validators/validateAddComment.js";
import addComment from "../controllers/comment/addComment.js";
import validateGetComments from "../controllers/comment/validators/validateGetComments.js";
import getComment from "../controllers/comment/getComment.js";
import getComments from "../controllers/comment/getComments.js";
import validateLikeDislikeComment from "../controllers/comment/validators/validateLikeDislikeComment.js";
import likeAComment from "../controllers/comment/likeAComment.js";
import dislikeAComment from "../controllers/comment/dislikeAComment.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";


const CommentRouter = express.Router();


CommentRouter.get("/all/:id", // post id
    validateGetComments,
    getComments
);

CommentRouter.post("/add/:id", // post id
    isLoggedIn,
    checkUserPresent,
    validateAddComment,
    addComment
);

CommentRouter.get("/:id", // post id
    validateGetComments,
    getComment
);

CommentRouter.patch("/like/:id", // comment id
    isLoggedIn,
    checkUserPresent,
    validateLikeDislikeComment,
    likeAComment
);

CommentRouter.patch("/dislike/:id", // comment id
    isLoggedIn,
    checkUserPresent,
    validateLikeDislikeComment,
    dislikeAComment
);


// requires authentications

export default CommentRouter;