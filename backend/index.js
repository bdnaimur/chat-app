import express from 'express';
import { chats } from './data/data.js';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import { errorHandler, notFound } from './middleWare/ErrorMiddleware.js';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config()



connectDB()
const app = express()
app.use(cors());
const PORT = process.env.PORT||5000;
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("api is running fully")
})
app.use('/api/user', userRoutes)
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/chat", (req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id", (req,res)=>{
   res.send(chats.find(chat=>chat._id == req.params.id))
})



app.use(notFound)
app.use(errorHandler)

// app.listen(PORT, console.log("server is running now", PORT))

const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}`)
  );

//   io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
  
//     socket.on('message', (msg) => {
//       console.log('Message received: ' + msg);
//       io.emit('message', msg); // Broadcast the message to everyone
//     });
//   });
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      // credentials: true,
    },
  });
  
io.on("connection", (socket) => {
    console.log("Connected to socket.io", socket.id);
    socket.on("message", (userData) => {
      console.log("userData", userData);
      socket.join(userData._id);
      socket.emit("connected");
    })
    socket.emit("test", "this is from server event")
})