import path from "path";
import { __dirname } from "../../../globals.js";


export const error404 = (req, res, next) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts('json')) {
        res.json({ msg: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
}