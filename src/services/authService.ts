import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export const registerUser = async (username: string, password: string) => {
  return await User.create({ username, password });
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "24h",
  });

  return token;
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};
