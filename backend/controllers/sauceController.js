const Sauce = require("../models/Sauce");
// for working with file and directory paths
const fs = require("fs");
const path = require("path");

// Get all sauces 🌷

exports.getAllSauces = (req, res) => {
  // use sauce model to find all sauces in the database
  Sauce.find()
    .then((sauces) => {
      const url = req.protocol + "://" + req.get("host");

      /*maps over the array retrieved from DB and creates a new array of obj
      where each sauce obj is augmented with the full image URL. ToObject() is used to convert the mongoose 
      object to a plain JS object */
      const updatedSauces = sauces.map((sauce) => {
        return {
          ...sauce.toObject(),
          imageUrl: url + "/images/" + sauce.imageUrl,
        };
      });
      res.status(200).json(updatedSauces);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

exports.createSauce = (req, res) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  console.log(req.body.sauce);

  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: req.file.filename, // Only store the filename
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    userId: req.body.sauce.userId,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "New sauce created successfully 🔥!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

// Get one sauce 🌷

exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const url = req.protocol + "://" + req.get("host");
      const updatedSauce = {
        ...sauce.toObject(),
        imageUrl: url + "/images/" + sauce.imageUrl,
      };

      console.log(updatedSauce.imageUrl); // Log the imageUrl

      res.status(200).json(updatedSauce);
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

// update a sauce

exports.updateSauce = (req, res) => {
  // find sauce to be modified
  Sauce.findOne({ _id: req.params.id })
    .then((oldSauce) => {
      // create a new sauce object with the same id
      let sauce = new Sauce({ _id: req.params.id });

      // if there is a new image uploaded in the request
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        req.body.sauce = JSON.parse(req.body.sauce);
        // Update the sauce object with new data including the new image
        sauce = {
          _id: req.params.id,
          name: req.body.sauce.name,
          manufacturer: req.body.sauce.manufacturer,
          description: req.body.sauce.description,
          mainPepper: req.body.sauce.mainPepper,
          imageUrl: req.file.filename, // new image filenname
          heat: req.body.sauce.heat,
          userId: req.body.sauce.userId,
        };

        // Delete the old image file
        const oldImagePath = path.join(
          __dirname,
          "..",
          "images",
          oldSauce.imageUrl
        );
        console.log(oldImagePath);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      } else {
        // if there is no new image we update the sauce object with the data from the form without the image
        sauce = {
          _id: req.params.id,
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          description: req.body.description,
          mainPepper: req.body.mainPepper,
          imageUrl: req.body.imageUrl,
          heat: req.body.heat,
          userId: req.body.userId,
        };
      }
      // update the sauce in the DATABASE
      Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
        res.status(201).json({
          message: "Sauce updated successfully!",
        });
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Delete a sauce

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce not found" });
      }

      // Get the filename of the image from the sauce object
      const filename = sauce.imageUrl;

      // Delete the image file from the server directory
      fs.unlink("images/" + filename, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
          // Handle error while deleting image
          return res.status(500).json({ message: "Error deleting image" });
        }

        // Delete the sauce from the database after successful deletion of image
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Sauce deleted successfully" });
          })
          .catch((error) => {
            res.status(400).json({ message: error.message });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

// like or dislike a sauce

exports.likeOrDislikeSauce = (req, res) => {
  // find the sauce by id
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // if the user likes the sauce
      if (req.body.like === 1) {
        // if the user has already liked the sauce
        if (sauce.usersLiked.includes(req.body.userId)) {
          return res.status(400).json({
            message: "You already liked this sauce!",
          });
        } else {
          // if the user has already disliked the sauce
          if (sauce.usersDisliked.includes(req.body.userId)) {
            // remove the user from the usersDisliked array
            sauce.usersDisliked = sauce.usersDisliked.filter(
              (userId) => userId !== req.body.userId
            );
            // decrement the number of dislikes
            sauce.dislikes--;
          }
          // add the user to the usersLiked array
          sauce.usersLiked.push(req.body.userId);
          // increment the number of likes
          sauce.likes++;
        }
      }
      // if the user dislikes the sauce
      if (req.body.like === -1) {
        // if the user has already disliked the sauce
        if (sauce.usersDisliked.includes(req.body.userId)) {
          res.status(400).json({
            message: "You already disliked this sauce!",
          });
        } else {
          // if the user has already liked the sauce
          if (sauce.usersLiked.includes(req.body.userId)) {
            // remove the user from the usersLiked array
            sauce.usersLiked = sauce.usersLiked.filter(
              (userId) => userId !== req.body.userId
            );
            // decrement the number of likes
            sauce.likes--;
          }
          // add the user to the usersDisliked array
          sauce.usersDisliked.push(req.body.userId);
          // increment the number of dislikes
          sauce.dislikes++;
        }
      }
      // if the user removes the like or dislike
      if (req.body.like === 0) {
        // if the user has already liked the sauce
        if (sauce.usersLiked.includes(req.body.userId)) {
          // remove the user from the usersLiked array
          sauce.usersLiked = sauce.usersLiked.filter(
            (userId) => userId !== req.body.userId
          );
          // decrement the number of likes
          sauce.likes--;
        }
        // if the user has already disliked the sauce
        if (sauce.usersDisliked.includes(req.body.userId)) {
          // remove the user from the usersDisliked array
          sauce.usersDisliked = sauce.usersDisliked.filter(
            (userId) => userId !== req.body.userId
          );
          // decrement the number of dislikes
          sauce.dislikes--;
        }
      }
      // update the sauce in the DATABASE
      Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => {
          res.status(201).json({
            message: "Sauce liked/disliked successfully!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};
