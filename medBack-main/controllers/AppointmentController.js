const appointmentModel = require('../models/AppointmentModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require("../models/UserModel");
const specModel = require('../models/SpecialiteModel');
require('../passportConfig');
var moment = require('moment'); // require

//const Validateappointment = require('../validation/appointmentValid')
module.exports = {

    createappointment: function (req, res) {
        console.log(req.body)
        appointmentModel.create(req.body, (err, appointment) => {
            if (err) {
                res.json({ message: 'error create appointment' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'appointment created ', data: appointment, status: 200 })

            }
        })
    },
    // Get Appointement by Doctor Id 
    getDoctorAppointment : function (req,res){
        appointmentModel.find({doctorId:req.params.id}).populate('userId').exec((err, appointments) => {
            if (err) {
                console.log(err)
                res.json({ message: 'error get all appointments' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all appointments in system', size: appointments.length, data: appointments, status: 200 })

            }
        })
    },
    /// GET DOCTOR DATE APPOintement
    getDoctorDateAppointment : function (req,res){
        appointmentModel.find({doctorId:req.params.id},'-_id date').exec((err, appointments) => {
            if (err) {
                console.log(err)
                res.json({ message: 'error get all appointments' + err, data: null, status: 500 })
            }
            else {
                console.log(moment.utc(appointments.date).format())
                res.send(appointments)

            }
        })
    },
    getAllappointments: function (req, res) {
        appointmentModel.find({}).populate('userId').populate('doctorId').exec((err, appointments) => {
            if (err) {
                res.json({ message: 'error get all appointments' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all appointments in system', size: appointments.length, data: appointments, status: 200 })

            }
        })
    },
    // Get appointement for the user
    getappointmentByUserId : function (req,res){
        appointmentModel.find({userId: req.params.id, cancel:false}).select('-password')
        .populate({
            path: 'doctorId',
            model: userModel,
           
            populate: {
               path: 'specialisation',
               model:specModel ,
               select: "name"
            }
         })
      
        .exec((err,appointment)=>{
            console.log("app", appointment)
            
            if (err) {
                res.json({ message: 'error get one appointment' + err, data: null, status: 500 })
             
            }
            else {
                res.json({ data: appointment, status: 200 })
               

            }
        })
    },
    // GET USER APPOINTEMENT FOR DOCTOR
    getUserAppointment : function (req,res) {
        
        appointmentModel.find({doctorId : req.params.id}, 'userId')
        .populate('userId')
        .exec((err,appointment)=>{
           // console.log("app", appointment)
            
            if (err) {
                res.json({ message: 'error get one appointment' + err, data: null, status: 500 })
             
            }
            else {
             
                const ids = appointment.map(o => o.id)
                const filtered = appointment.filter(({id}, index) => !ids.includes(id, index + 1))

                console.log("result", filtered)
                res.json({ data: appointment, status: 200 })
               

            }
        })
    },
    getappointmentById: function (req, res) {
        appointmentModel.findById({ _id: req.params.id })
            .exec((err, appointment) => {
                if (err) {
                    res.json({ message: 'error get one appointment' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' appointment in system', data: appointment, status: 200 })


                }
            })
    },
    deleteappointmentById: function (req, res) {
        appointmentModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, appointment) => {

                if (err) {
                    res.json({ message: 'error delete  one appointment' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one appointment delete system', data: appointment, status: 200 })
                }
            })
    },
    updateappointmentById: (req, res) => {
        console.log(req.body, req.params)
        appointmentModel.findOneAndUpdate({ _id: req.params.id },req.body, { new: true }, (err, appointment) => {
            if (err) {
                res.status(500).json({
                    message: "appointment not updated ",
                    data: null,
                });
            } else {
                console.log(appointment)
                res.status(200).json({
                    message: "appointment updated successfuly ",
                    data: req.body,
                });
            }
        });
        
    },
        // Cancel Appointement
   cancelAppointement: (req, res) => {
        appointmentModel.findOneAndUpdate({ _id: req.params.id }, { cancel : true  },
             { new: true }, (err, appointment) => {
            if (err) {
                res.status(500).json({
                    message: "appointment not cancel ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "appointment cancel successfuly ",
                   
                });
            }
        });
        
    },


    // Delete Data
    deleteAppointemnt: (req,res)=>{
        appointmentModel.deleteMany({},function(err, reslut) {
            if (err) {
                console.log(err)
            } else {
                console.log(reslut)
                res.end('success');
            }})
    }
}