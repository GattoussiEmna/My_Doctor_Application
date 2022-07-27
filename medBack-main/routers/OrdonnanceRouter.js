const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')

const ordonnanceController = require('../controllers/OrdonnanceMedicalController')


Route.post("/Addordonnance", upload.single("file"), ordonnanceController.createOrdonnance);
Route.get("/ordonanceFile/:id", ordonnanceController.getFile);
Route.get("/ALLordonnance", ordonnanceController.getAllordonnances)
Route.get("/getordonnanceByID/:id", ordonnanceController.getordonnanceById);
Route.post("/getPrescriptionDoctor", ordonnanceController.getordonnanceByDotorID);
Route.delete("/deleteordonnance/:id", ordonnanceController.deleteordonnanceById);
Route.get("/patientOrdonance/:id", ordonnanceController.getordonnanceByPatientID)
Route.put("/updateordonnance/:id",upload.single("file"), ordonnanceController.updateordonnanceById)
module.exports = Route;