const express = require("express");
const router = express.Router();

// insertion des middleware
const auth = require("../middleware/auth");

module.exports = router;
