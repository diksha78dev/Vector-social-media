import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .populate("sender", "username name avatar")
      .sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {

    const { conversationId, content } = req.body;

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      content,
    });

    const populated = await message.populate(
      "sender",
      "username name avatar"
    );

    res.json(populated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};