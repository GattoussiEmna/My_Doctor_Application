
const mongoose = require("mongoose");
const DiagnostiqueSchema = new mongoose.Schema(

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
    file: {
      type: String,
      required: true,
    }
  },

  { timestamps: true }

);

module.exports = mongoose.model("Diagnostique", DiagnostiqueSchema);
