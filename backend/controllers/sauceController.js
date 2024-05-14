const Sauce = require("../models/Sauce");
// for working with file and directory paths
const fs = require("fs");

// Get all sauces 🌷

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => {
      const url = req.protocol + "://" + req.get("host");
      const updatedSauces = sauces.map((sauce) => {
        return {
          ...sauce.toObject(),
          imageUrl: url + "/images/" + sauce.imageUrl,
        };
      });
      res.status(200).json(updatedSauces);
      //  console log the updatedSauces as well as the imageUrl to demonstrate that the imageUrl is now a full url
      console.log(updatedSauces);
      console.log(updatedSauces[0].imageUrl);
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

      console.log(updatedSauce.imageUrl); // Log the imageUrlgit sta

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
  let sauce = new Sauce({ _id: req.params.id });

  // if there is a new image
  if (req.file) {
    // get the url of the image
    const url = req.protocol + "://" + req.get("host");
    // parse the sauce object
    // update the imageUrl with the new image and the url
    // update the sauce object
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat: req.body.sauce.heat,
      userId: req.body.sauce.userId,
    };
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
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

// Delete a sauce

exports.deleteSauce = (req, res) => {
  // find the sauce by id
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // get the filename of the image from the url of the image in the database
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink("images/" + filename, () => {
        // delete the sauce from the DATABASE
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              message: "Sauce deleted successfully!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: error.message,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
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
          res.status(400).json({
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
