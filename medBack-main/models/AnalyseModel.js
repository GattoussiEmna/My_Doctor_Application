
const mongoose = require("mongoose");
const AnalyseSchema = new mongoose.Schema(

  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctorId :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name :{
      type: String,
      required :true
    },
    file: {
      type: String,
      
    },
    payed:
    {
        type: Boolean,
        default: false
    },
   patientSend:
    {
        type: Boolean,
        default: false
    },
    labSend:{
      type: Boolean,
       default: false
    },
    labId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
    }
  
  },

  { timestamps: true }

);

module.exports = mongoose.model("Analyse", AnalyseSchema);
