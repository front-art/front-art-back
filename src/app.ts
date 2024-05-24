import express from "express";
import cors from "cors"; // Import the cors middleware
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./config/swagger";
import "./express"; // Ensure this import includes your custom types

const app = express();
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}
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
