const Sauce = require("../models/Sauce");
// for working with file and directory paths
const fs = require("fs");

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

exports.createSauce = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  req.body.sauce = JSON.parse(req.body.sauce);
  console.log(req.body.sauce);

  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
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

exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
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
