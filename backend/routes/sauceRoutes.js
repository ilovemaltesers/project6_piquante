const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauceController");

// insertion des middlewares
const auth = require("../middleware/authMiddleware");

const multer = require("../middleware/multer-config");

// later to add auth and mult in the routes!!!!!

// get all sauces
router.get("/", sauceController.getAllSauces);

// create a sauce
router.post("/", auth, multer, sauceController.createSauce);

// get one sauce
router.get("/:id", sauceController.getOneSauce);

// update a sauce
router.put("/:id", auth, multer, sauceController.updateSauce);

// delete a sauce
router.delete("/:id", auth, sauceController.deleteSauce);

module.exports = router;
