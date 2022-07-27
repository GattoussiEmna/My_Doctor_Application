
const mongoose = require("mongoose");
const OrdonnanceSchema = new mongoose.Schema(

  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
     description: {
      type: String,
      required: true
    }, 
    ordonnancefile: {
      type: String,
      required: true
  },
  },

  { timestamps: true }

);

module.exports = mongoose.model("Ordonnance", OrdonnanceSchema);
