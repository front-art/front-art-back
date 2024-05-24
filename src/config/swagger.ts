import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API with Swagger",
    version: "1.0.0",
    description:
      "This is a simple CRUD API application made with Express and documented with Swagger",
  },
  servers: [
    {
      url: process.env.API_URL,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
