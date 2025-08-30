import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";


// Create Express app and http server
const app = express();
const server = http.createServer(app);


// Middleware setup
app.use(cors());
app.use(express.json({ limit: "4mb" }));


// Init socket.io
export const io = new Server(server, {
  cors: {origin: "*"}
})

// Store online users
export const userSocketMap = {}; // {userId: sockedId}

// Socket.id connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId; // use auth, not query
  console.log("User connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});




// Routes setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages" , messageRouter)

await connectDB();

if(process.env.NODE_ENV !== "production"){
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log("Server running on PORT" + PORT);
  });
  
}

// Export server for Vercel
export default server;