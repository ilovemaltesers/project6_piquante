const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // Corrected import

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userschema plugin
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
