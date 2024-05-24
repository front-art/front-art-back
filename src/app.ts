import cors from "cors";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import setupSwagger from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use(
  "/api/",
  profileRoutes,
  express.static(path.join(__dirname, "uploads"))
);
// Set up Swagger
setupSwagger(app);

export default app;
