import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
    try {
        const { content, intent } = req.body;
        if (!content || !intent) {
            return res.json({
                success: false,
                message: "Content and intent are required"
            });
        }
        const post = await Post.create({author: req.user.id, content, intent});
        const populatedPost = await post.populate("author", "username avatar");
        res.status(201).json(populatedPost);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
