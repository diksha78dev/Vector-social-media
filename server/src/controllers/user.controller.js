import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (user.avatarPublicId) {
            await cloudinary.uploader.destroy(user.avatarPublicId);
        }
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "avatars",
            transformation: [
                { width: 300, height: 300, crop: "fill" },
                { quality: "auto" },
            ],
        });
        user.avatar = uploadResult.secure_url;
        user.avatarPublicId = uploadResult.public_id;
        await user.save();
        return res.status(200).json({
            success: true,
            avatar: user.avatar,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, name, surname, phoneNumber, bio, description } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (username !== undefined) {
            user.username = username;
        }
        if (name !== undefined) {
            user.name = name;
        }
        if (surname !== undefined) {
            user.surname = surname;
        }
        if (phoneNumber !== undefined) {
            user.phoneNumber = phoneNumber;
        }
        if (bio !== undefined) {
            user.bio = bio;
        }
        if (description !== undefined) {
            user.description = description;
        }
        await user.save();
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                surname: user.surname,
                phoneNumber: user.phoneNumber,
                bio: user.bio,
                description: user.description,
                avatar: user.avatar,
                isProfileComplete: user.isProfileComplete,
                signupStep: user.signupStep,
            },
            message: "Profile updated successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};