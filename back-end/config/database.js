const mongoose = require("mongoose");

exports.connect = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((e) => {
    console.error("Connected failed To MongoDB" + e);
  })
}