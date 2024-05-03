const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauceController");

// insertion des middlewares
const auth = require("../middleware/authMiddleware");

const multer = require("../middleware/multer-config");

// later to add auth and mult in the routes!!!!!
// get all sauces
router.get("/", sauceController.getAllSauces);

module.exports = router;
