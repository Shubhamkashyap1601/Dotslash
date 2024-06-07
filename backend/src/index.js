import connectDB from "./db/db.js";
import {app} from "./app.js"
import dotenv from 'dotenv'

dotenv.config({
    path : './.env'
});

let server;
connectDB().then(()=>{
    server = app.listen(process.env.PORT,()=>{
        console.log("Server running on port: ", process.env.PORT);
    })
})

process.on("unhandledRejection",err=>{
    console.log("an error occured : ",err.message);
    server.close(()=> process.exit(1));
})