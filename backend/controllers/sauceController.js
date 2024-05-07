const Sauce = require("../models/Sauce");

exports.getAllSauces = (req, res) => {
  res.send([
    {
      userId: "33",
      name: "Cholula",
      manufacturer: "String — manufacturer of the sauce.",
      description:
        "Mexican hot sauce: smooth, tangy, spicy. Made with pequin peppers.",
      mainPepper: "Pequin Pepper",
      imageUrl: "http://localhost:3000/images/cholula.jpeg",
      heat: 2,
      likes: 4243432,
      dislikes: 23,
      usersLiked: ["22"],
      usersDisliked: ["23"],
    },
    {
      userId: "33",
      name: "Big Bang",
      manufacturer: "Mr Pic's",
      description:
        "mélange secret des variétés de piment les plus piquantes au monde.",
      mainPepper: "Carolina Reaper, Magma® et Judgment Day®",
      imageUrl: "http://localhost:3000/images/bigbang.jpg",
      heat: 10,
      likes: 56,
      dislikes: 7,
      usersLiked: ["22"],
      usersDisliked: ["23"],
    },
  ]);
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
