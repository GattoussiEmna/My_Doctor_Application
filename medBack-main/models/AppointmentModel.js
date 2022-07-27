
const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema(

  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true

    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true

    },
    date: {
      type: Date,
      required: true
    },
    confirm : {
      type :Boolean,
      default: false
    },
    cancel : {
      type :Boolean,
      default: false
    }
  
  },

  { timestamps: true }

);

module.exports = mongoose.model("Appointment", AppointmentSchema);
