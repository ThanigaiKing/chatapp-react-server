const express=require('express');
const app=express();
const http=require('http');
const cors=require("cors");  
const {Server}=require("socket.io");
app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"*",
    },
});

io.on("connection",(socket)=>{         //main process and match the  string like "connection","join_room" etc it provide way to enter in it
console.log(`user connectd: ${socket.id}`);

 socket.on("join_room",(data)=>{
    socket.join(data)                                    //it get the data from client(roomid)
    console.log(`user with ID: ${socket.id} joined room: ${data}`);
 })

 socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data)      //send data to chat.js to matching with the room id
    console.log(data);
 })

 socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id);
 })
})

server.listen(3001,()=>{
    console.log("Server is Running");
})
