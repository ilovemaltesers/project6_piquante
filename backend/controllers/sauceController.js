exports.getAllSauces = (req, res) => {
  res.send([
    {
      userId: "33",
      name: "String — name of the sauce.",
      manufacturer: "String — manufacturer of the sauce.",
      description: "String — description of the sauce.",
      mainPepper: "String — the main pepper ingredient in the sauce.",
      imageUrl: "http://localhost:3000/images/cholula.jpeg",
      heat: 222,
      likes: 4243432,
      dislikes: 234324432,
      usersLiked: ["22"],
      usersDisliked: ["23"],
    },
  ]);
};
