import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

// Fetches posts based on createdAt for the explore page

const getPostsForFeed = asyncError(async (req, res, next) => {
    const query = req.query;
    const user = req.user;
    let posts = [];

    if(query === "trending"){
        posts = await Post.find({ user: { $in: user.followings } }).sort({ likes: -1 }).populate("user");
    }else if(query === "oldest"){
        posts = await Post.find({ user: { $in: user.followings } }).sort({ createdAt: -1 }).populate("user");
    }else if(query === "latest"){
        posts = await Post.find({ user: { $in: user.followings } }).sort({ createdAt: -1 }).populate("user");
    }else {
        return res.status(200).json({
            msg: "FEED_FETCHED_SUCCESFULLY",
            posts : []
        });
    }
    
    return res.status(200).json({
        msg: "FEED_FETCHED_SUCCESFULLY",
        posts
    });
});

export default getPostsForFeed;