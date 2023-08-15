import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getFollowings = asyncError(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
        return next(new ErrorHandler("USER_NOT_FOUND" , 404));
    }

    return res.status(200).json({
        msg: "FOLLOWINGS_FETCHED_SUCCESFULLY",
        followers : user.followings
    });
});

export default getFollowings;