const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauceController");

// insertion des middlewares
const auth = require("../middleware/authMiddleware");

const multer = require("../middleware/multer-config");

// Routes

// get all sauces
router.get("/", auth, sauceController.getAllSauces);

// create a sauce
router.post("/", auth, multer, sauceController.createSauce);

// get one sauce
router.get("/:id", auth, sauceController.getOneSauce);

// update a sauce
router.put("/:id", auth, multer, sauceController.updateSauce);

// delete a sauce
router.delete("/:id", auth, sauceController.deleteSauce);

// like or dislike a sauce
router.post("/:id/like", auth, sauceController.likeOrDislikeSauce);

module.exports = router;
