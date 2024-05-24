import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors middleware
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./config/swagger";
import "./express"; // Ensure this import includes your custom types

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}
dotenv.config();

const app = express();
// Configure CORS to allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // Use the cors middleware

app.use(express.json());

app.use("/api/auth", authRoutes);

// Set up Swagger
setupSwagger(app);

export default app;
