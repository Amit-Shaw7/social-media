import express from 'express';

const AuthRouter = express.Router();

AuthRouter.get('/' , (req , res , next) => {
    res.send("Hello")
})

export default AuthRouter;