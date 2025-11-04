// // import express from 'express'
// // import http from 'http'
// // import { Server } from 'socket.io'

// // // Create an Express application
// // const app = express()


// // // Create an HTTP server


// // const server = http.createServer(app)

// // // Create a Socket.IO server
// // const io = new Server(server)

// // // Handle Socket.IO connections
// // io.on('connection', (socket) => {
// //   console.log('A user connected')

// //   // Handle disconnection
// //   socket.on('disconnect', () => {
// //     console.log('A user disconnected')
// //   })
// // })
// // app.get('/', (req, res) => {
// //   res.send('server Working fine!')
// // })

// // // Start the server
// // const PORT = process.env.PORT || 9000
// // server.listen(PORT, () => {
// //   console.log(`Server is running on http://localhost:${PORT}`)
// // })

// // server.js
// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*" } // allow all origins for testing
// });

// app.get('/', (req, res) => {
//   res.send('Socket.IO Server is running!');
// });

// // Handle socket connections
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen for messages
//   socket.on('chat message', (msg) => {
//     console.log('Message:', msg);
//     io.emit('chat message', msg); // broadcast to all clients
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(3000, () => console.log('Server running on port 3000'));
// server/index.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => {
//   console.log("⚡ User connected:", socket.id);

//   socket.on("join_room", (room) => {
//     socket.join(room);
//     console.log(`🚪 User ${socket.id} joined room: ${room}`);
//   })

//   socket.send("send_room_message",({room,message,sender})=>{
//     console.log(`Message from ${sender} to room ${room}: ${message}`);
//     io.to(room).emit("receive_room_message",{message,sender})
//   });

//   socket.on("send_message", (data) => {
//     console.log("📨 Received message:", data);
//     io.emit("receive_message", data); // Broadcast to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });


io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // Join a room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`📥 ${socket.id} joined room ${room}`);
  });

  // Send message to a room
  socket.on("send_room_message", ({ room, message, sender }) => {
    console.log(`💬 Message to room ${room}:`, message);
    io.to(room).emit("receive_room_message", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("✅ Server running on port 3000"));
