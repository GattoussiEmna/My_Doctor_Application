const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const analyseController = require('../controllers/AnalyseController')
Route.post("/Addanalyse",analyseController.createanalyse);
Route.post("/getAnalysForDoc", analyseController.getAnalyseByDoctorId);
Route.get("/ALLanalyse", analyseController.getAllanalyses);
Route.put("/updateSendPatient/:id", analyseController.updateSendPatient);
Route.get("/getAnalyseByPatientId/:id", analyseController.getAnalyseByPatientId);
Route.get("/getAnalyseByLabId/:id", analyseController.getAnalyseByLabID);
Route.delete("/deleteAll", analyseController.deletALL)
Route.put("/updateAnalyseBYLABOID/:id", analyseController.updateAnalyseByLabID);
Route.get("/getanalyseByID/:id", analyseController.getanalyseById);
Route.get("/getAnalyseFile/:id", analyseController.getAnalyseFile);
Route.delete("/deleteanalyse/:id", passport.authenticate('jwt', { session: false }), analyseController.deleteanalyseById)
Route.put("/updateanalyse/:id", upload.single("file"),  analyseController.updateanalyseById)
module.exports = Route;