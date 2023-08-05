import { logEvents } from "./logger.js"

export const errorHandler = (error , req , res , next) => {
    logEvents(`${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}` , 'errLog.log');
    console.log(error.stack);

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({
        msg : error.message
    });
}