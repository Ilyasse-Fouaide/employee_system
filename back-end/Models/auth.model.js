const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Auth = mongoose.model("Auth", authSchema);

module.exports = { Auth }
