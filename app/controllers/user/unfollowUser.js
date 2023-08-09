import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const unfollowUser = asyncError(async (req, res, next) => {
    const user = req.user;
    const followedUserId = req.params.userId;

    const followedUser = await User.findById(followedUserId);
    if (!followedUser) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }

    followedUser.followers = followedUser.followers.filter(id => !id.equals(user._id));
    user.followings = user.followings.filter(id => !id.equals(followedUser?._id));

    await user.save();
    await followedUser.save();

    return res.status(200).json({
        msg: "USER_UNFOLLOWED_SUCCESFULLY",
    });
});

export default unfollowUser;