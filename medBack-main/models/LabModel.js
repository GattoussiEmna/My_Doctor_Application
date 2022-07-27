
const mongoose = require("mongoose");
const LabSchema = new mongoose.Schema(

  {
    name: {
      type: String
      
    },
  
    address: {
      type: String,
      required: true
    },
    labId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }

  },

  { timestamps: true }

);

module.exports = mongoose.model("Lab", LabSchema);
