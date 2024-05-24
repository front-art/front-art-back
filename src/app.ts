import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./config/swagger";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const app = express();
// Configure CORS
const corsOptions = {
  // origin: ["http://example.com", "http://anotherdomain.com"], // Replace with your allowed origins
  origin: "*", // allow any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // Use the cors middleware

app.use(express.json());

app.use("/api/auth", authRoutes);

setupSwagger(app);

export default app;
