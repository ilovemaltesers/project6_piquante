const express = require("express");
const router = express.Router();

// insertion des middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// later to add auth and mult in the routes!!!!!

module.exports = router;
