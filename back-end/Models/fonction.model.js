const mongoose = require("mongoose");

const fonctionSchema = new mongoose.Schema({
  fonction: {
    type: String,
    unique: true,
    required: true,
  }
}, { timestamps: true });

const Fonction = mongoose.model("Fonction", fonctionSchema);

module.exports = { Fonction }
