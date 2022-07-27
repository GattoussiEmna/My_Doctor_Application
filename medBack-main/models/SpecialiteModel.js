
const mongoose = require("mongoose");
const specialiteSchema = new mongoose.Schema(

  {
    name: {
      type: String,
      required: true
    }
 
  
  },

  { timestamps: true }

);

module.exports = mongoose.model(" Specialite", specialiteSchema);
