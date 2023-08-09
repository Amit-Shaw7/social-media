import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getPostsForFeedOldest = asyncError(async (req, res, next) => {
    // Assuming 'Post' model has a 'userId' field indicating the user who created the post
    // .sort({ createdAt: -1 })

    const user = req.user;
    const posts = await Post.find({ user: { $in: user.followings } }).sort({ createdAt: 1 }).populate("user");
    if (!posts) {
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

export default getPostsForFeedOldest;