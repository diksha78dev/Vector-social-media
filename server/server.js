import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongodb.js";
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/post.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import passport from "./src/config/passport.js";
import commentRoutes from "./src/routes/comment.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import conversationRouter from "./src/routes/conversation.routes.js";
import { Server } from "socket.io";

const app = express();

connectDB();

app.use(cors({
  origin: ["http://localhost:3000", "http://vector-lac.vercel.app", "https://vector-lac.vercel.app", process.env.FRONTEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRouter);
app.use("/api/conversation", conversationRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send_message", (data) => {

    const { receiverId } = data;

    const receiverSocket = onlineUsers.get(receiverId);

    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", data);
    }

  });

  socket.on("disconnect", () => {

    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    }

  });

});