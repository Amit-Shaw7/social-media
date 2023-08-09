import { asyncError } from "../../utils/errors/asyncError.js";
const getUserProfile = asyncError(async (req, res, next) => {
    const user = req.user;

    return res.status(200).json({
        msg: "USER_FETCHED_SUCCESFULLY",
        user,
    });
});

export default getUserProfile;