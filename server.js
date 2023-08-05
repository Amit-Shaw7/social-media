import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import cors from 'cors';
import { __dirname } from './globals.js';
import { connectToMongo } from './mongo.js';
import AuthRouter from './app/routes/auth.js';
import { logger } from './app/middleware/logger.js';
import { errorHandler } from './app/middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions.js';


const app = express();
await connectToMongo();
// app.use(express.json())
app.use(logger);
app.use(cookieParser());
// app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , "views" , "welcome.html"));
});


app.use('/auth' , AuthRouter);


/*
 * Handle 404 error
 */
app.all('*' , (req , res , next) => {
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname , "views" , "404.html"));
    }else if(req.accepts('json')){
        res.json({msg : '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
});

app.use(errorHandler);


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("*    Server Started at " + process.env.PORT);
    console.log("****************************")
});

export default app;
