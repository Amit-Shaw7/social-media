import Comment from "../../models/Comment.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const addComment = asyncError(async (req, res, next) => {
    const user = req.user;
    req.body.user = user._id;
    req.body.post = req.params.id;
    const comment = await Comment.create({...req.body});
    if (!comment) {
        return next(new ErrorHandler());
    }

    return res.status(200).json({
        msg: "COMMENTED_SUCCESFULLY",
        comment
    })
})
export default addComment;