import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  content: {
    type: String,
    required: true,
    maxlength: 1000
  },

  intent: {
    type: String,
    enum: ["ask", "build", "share", "discuss", "reflect"],
    required: true
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Post", postSchema);
