const mongoose = require("mongoose");

const congeSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Conge = mongoose.model("Conge", congeSchema);

module.exports = { Conge }
