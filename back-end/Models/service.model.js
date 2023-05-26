const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    unique: true,
    required: true,
  }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

module.exports = { Service }
