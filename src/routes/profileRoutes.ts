import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { avatar, uploadAvatar } from "../controllers/profileController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile user related endpoints
 */

/**
 * @swagger
 * /uploadAvatar:
 *   post:
 *     summary: Upload avatar for user
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *       500:
 *         description: Error uploading avatar
 */
// todo clean code mvc articture
router.post("/uploadAvatar", authenticateToken, uploadAvatar, avatar);

export default router;
