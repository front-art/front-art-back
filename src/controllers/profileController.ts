import { Request, Response } from "express";
import User from "../models/user";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB limit
});

export const uploadAvatar = upload.single("avatar");

export const avatar = async (req: Request, res: Response) => {
  const { id } = req.body;
  const avatar = req.file;

  if (!avatar) {
    return res
      .status(400)
      .json({ error: "No file uploaded or file size too large" });
  }

  try {
    const user = await User.findByPk(id);
    if (user) {
      user.avatar = path.join("uploads", avatar.filename);
      await user.save();
    } else {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Avatar uploaded successfully", file: avatar });
  } catch (error) {
    console.error("Error uploading avatar", error);
    res.status(500).json({ error: "Error uploading avatar" });
  }
};
