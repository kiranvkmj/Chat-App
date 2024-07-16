import express from "express";
import dotenv from "dotenv";
import cookiePaeser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/ConnectToMongoDB.js";

const app= express();
const PORT= process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookiePaeser());
//to parse the incoming requests with json payloads
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

// app.get("/",(req,res)=>{
//     res.send("hello world kiran !");
// });



app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
});
