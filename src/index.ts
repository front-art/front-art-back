import { Pool } from "pg";
import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgres://admin:123@localhost:5432/postgres");

const app = express();
const port = 3000;
app.use(express.json());

// PostgreSQL client setup
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err);
  }
  console.log("Connected to PostgreSQL");
  release();
});

const Record = sequelize.define("record", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database", error);
  });

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.post("/addRecord", async (req, res) => {
  const { title } = req.body;

  try {
    const record = await Record.create({ title });
    res.json({ message: "Record added successfully", record });
  } catch (error) {
    console.error("Error adding record", error);
    res.status(500).json({ error: "Error adding record" });
  }
});

app.get("/getRecords", async (req, res) => {
  try {
    const records = await Record.findAll();
    res.json(records);
  } catch (error) {
    console.log("Error fetching records", error);
    res.status(500).json({ error: "Error fetching records" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
