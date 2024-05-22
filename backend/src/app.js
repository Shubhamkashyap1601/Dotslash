import express from "express";
import homeRouter from "./routes/student.routes.js"
import blogRouter from "./routes/blog.routes.js"
import resourceRouter from "./routes/resource.routes.js"
import cors from "cors";
import cookieParser from "cookie-parser" 

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api",homeRouter);
app.use("/api",blogRouter);
app.use("/api",resourceRouter);

export {app};