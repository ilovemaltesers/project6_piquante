// mongodb+srv://SaraRead:<password>@cluster0.bkyxzv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// password 1cITxDC2qg6LqD3K

//

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res) => {
  res.json({ message: "Your request was successful!" });
});

app.use("/api/auth", userRoutes);

module.exports = app;
