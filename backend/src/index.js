import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import {app,server} from "./lib/socket.js";
dotenv.config();

const PORT=process.env.PORT;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", 
];
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT,()=>{
    console.log("Server is running on PORT:" +PORT);
    connectDB();
})