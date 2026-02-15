import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { deleteAllNotifications, deleteMultipleNotifications, deleteNotification, getNotifications, markAsRead } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.get("/", auth, getNotifications);
notificationRouter.put("/:id/read", auth, markAsRead);
notificationRouter.delete("/:id", auth, deleteNotification);
notificationRouter.post("/bulk-delete", auth, deleteMultipleNotifications);
notificationRouter.delete("/all", auth, deleteAllNotifications);

export default notificationRouter;