import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/authService";
import { convertToJalali } from "../utils/string";
import { UserAttributes } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.URL as string;

interface ProfileUser extends UserAttributes {
  createdAt: Date;
  jalaliCreatedAt: string;
  timestamps: number;
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const profile = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { dataValues } = user;

    const createdAt = dataValues.createdAt
      ? new Date(dataValues.createdAt)
      : new Date();

    // todo add .env
    const avatarUrl = dataValues.avatar
      ? `${BASE_URL}/${dataValues.avatar}`
      : null;

    const response: Pick<
      ProfileUser,
      "timestamps" | "jalaliCreatedAt" | "username" | "avatar" | "id"
    > = {
      username: dataValues.username,
      timestamps: createdAt.getTime(),
      avatar: avatarUrl,
      id: dataValues.id,
      jalaliCreatedAt: convertToJalali(createdAt.toISOString()),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
};
