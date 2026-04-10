import express from "express";
import http from "http";
import {Server} from "socket.io";

const app=express();
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});

app.use(express.json());

app.get("/",(req,res)=>res.json({status:"ok"}));

app.post("/track",(req,res)=>{
 const data=req.body;
 io.emit("location_update",data);
 res.json({ok:true});
});

server.listen(4000,()=>console.log("Running on 4000"));
