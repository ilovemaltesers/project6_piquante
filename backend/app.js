//dotenv loads environment variables from a .env file into process.env

require("dotenv").config();

const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const sauceRoutes = require("./routes/sauceRoutes");

const app = express();

// for working with file and directory paths
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// Any requests to the images path will be handled by this middleware. express.static is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use("/images", express.static(path.join(__dirname, "images")));

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

module.exports = app;
