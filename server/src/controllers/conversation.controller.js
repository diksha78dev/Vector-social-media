import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user._id;
        let convo = await Conversation.findOne({ participants: { $all: [senderId, receiverId] }, });
        if (!convo) {
            convo = await Conversation.create({ participants: [senderId, receiverId], });
        }
        res.json(convo);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const getConversation = async (req, res) => {
    try {
        const convo = await Conversation.findById(req.params.conversationId).populate("participants", "username name avatar");
        res.json(convo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getUserConversations = async (req, res) => {
  try {

    const conversations = await Conversation.find({
      participants: req.user._id
    })
      .populate("participants", "username name avatar")
      .sort({ updatedAt: -1 });

    res.json(conversations);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};