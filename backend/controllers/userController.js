const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup function

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({
            message: "User added successfully!",
          });
        })
        .catch((error) => {
          res.status(409).json({
            message: "This email is already in use!",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

// login function

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // find the user in the database (if matching email is found)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found, please sign up!",
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password) // compare the password entered by the user with the hashed password stored in the database
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          // if the password is correct, a token is generated
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
