require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

// for working with file and directory paths
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

// MONGOOSE CONNECTION
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
