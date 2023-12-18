import express from "express";
import router from "./routes/student.routes.js"
import cors from "cors";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true, limit:"16kb"}))
app.use(express.static("public"))
// app.use(cookieParser())

app.use("/api/v1/auth",router);

export {app};