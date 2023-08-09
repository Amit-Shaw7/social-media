import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const followUser = asyncError(async (req, res, next) => {
    const user = req.user;
    const userToFollowId = req.params.userId;

    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }

    userToFollow.followers.push(user._id);
    user.followings.push(userToFollow._id);

    await user.save();
    await userToFollow.save();

    return res.status(200).json({
        msg: "USER_FOLLOWED_SUCCESFULLY",
    });
});

export default followUser;