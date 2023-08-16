import { asyncError } from "../../utils/errors/asyncError.js";
import User from "../../models/User.js";

const findSuggestedUsers = asyncError(async (req, res, next) => {
    const user = req.user;
    let suggestedUsers = [];
    for (let i = 0; i < user.followers.length; i++) {
        const followers = await User.find({ _id: user.followers[i]});
        suggestedUsers = [...suggestedUsers, ...followers];
    }

    for (let i = 0; i < user.followings.length; i++) {
        const followings = await User.find({ _id: user.followings[i]});
        suggestedUsers = [...suggestedUsers, ...followings];
    }
    return res.status(200).json({
        msg: "SUGGESTED_USERS_FETCHED_SUCCESFULLY",
        users: suggestedUsers
    });
});

export default findSuggestedUsers;