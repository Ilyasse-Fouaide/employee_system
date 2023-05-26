const mongoose = require("mongoose");
const { Fonction } = require("./fonction.model");
const { Service } = require("./service.model");

const employeeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  dateN: {
    type: Date,
    required: true,
  },
  dateEmbauche: {
    type: Date,
    required: true,
  },
  salaire: {
    type: Number,
    required: true,
  },
  fonction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Fonction
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Service
  },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee }
