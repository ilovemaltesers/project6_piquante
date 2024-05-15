const mongoose = require("mongoose");

// uniqueValidator ensures that a field's value is unique across all records in the database.
const uniqueValidator = require("mongoose-unique-validator");

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
