const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const appointmentController = require('../controllers/AppointmentController')


Route.post("/Addappointment",  appointmentController.createappointment)
Route.get("/ALLappointment", appointmentController.getAllappointments)
Route.get("/getappointmentByID/:id", appointmentController.getappointmentById)
Route.get("/getappointmentByUserID/:id", appointmentController.getappointmentByUserId)
Route.delete("/deleteappointment/:id", passport.authenticate('jwt', { session: false }), appointmentController.deleteappointmentById)
Route.put("/updateappointment/:id",  appointmentController.updateappointmentById)
Route.put("/cancelAppointement/:id", appointmentController.cancelAppointement);
Route.get("/getDoctorAppointemnt/:id", appointmentController.getDoctorAppointment);
Route.get("/getDoctorDateAppointement/:id", appointmentController.getDoctorDateAppointment);
Route.get("/getPatient/:id", appointmentController.getUserAppointment);
Route.delete("/deleteAll", appointmentController.deleteAppointemnt);
module.exports = Route;