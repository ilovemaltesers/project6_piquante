// mongodb+srv://SaraRead:<password>@cluster0.bkyxzv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// password 1cITxDC2qg6LqD3K

const express = require("express");

//install cors

const cors = require("cors");

app.use(cors());

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

// MIDDLEWARE

const auth = require("./middleware/authMiddleware");

app.use(auth);

// ROUTES

const userRoutes = require("./routes/userRoutes");

// MONGOOSE CONNECTION

mongoose
  .connect(
    "mongodb+srv://SaraRead:1cITxDC2qg6LqD3K@cluster0.bkyxzv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res) => {
  res.json({ message: "Your request was successful!" });
});

//APP TO USE THESE ROUTES

app.use("/api/auth", userRoutes);

module.exports = app;
