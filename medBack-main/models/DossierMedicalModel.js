const mongoose = require("mongoose");

const DossierMedicalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required:true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required:false },
    weight: { type: Number  , required:true},
    height: { type: Number , required:true },
    bloodType: { type: String },
    allergies: { type: String },
    diseases: { type: String },
  
    otherInfos : {type : String},
    diagnostique: { type: mongoose.Schema.Types.ObjectId, ref: "Diagnostique" },
    ordonance: { type: mongoose.Schema.Types.ObjectId, ref: "Ordonnance" },
    analyse: { type: mongoose.Schema.Types.ObjectId, ref: "Analyse" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DossierMedical", DossierMedicalSchema);
