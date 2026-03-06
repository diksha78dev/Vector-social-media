import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/:conversationId", auth, getMessages);
messageRouter.post("/", auth, sendMessage);

export default messageRouter;