// mongodb+srv://SaraRead:<password>@cluster0.bkyxzv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// password 1cITxDC2qg6LqD3K

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

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

module.exports = app;
