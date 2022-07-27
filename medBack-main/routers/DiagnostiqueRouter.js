const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')

const diagnostiqueController = require('../controllers/DiagnostiqueContoller')


Route.post("/Adddiagnostique",upload.single("file"), diagnostiqueController.creatediagnostique)
Route.get("/ALLdiagnostique", diagnostiqueController.getAlldiagnostiques)
Route.get("/getdiagnostiqueByID/:id", passport.authenticate('jwt', { session: false }),diagnostiqueController.getdiagnostiqueById)
Route.delete("/deletediagnostique/:id", diagnostiqueController.deletediagnostiqueById)
Route.put("/updatediagnostique/:id", upload.single("file"),  diagnostiqueController.updatediagnostiqueById)
Route.get("/getUserDiagnostique/:id", diagnostiqueController.getDiagnostiqueByUserId);
Route.get("/getPAtientDiagnostique/:id", diagnostiqueController.getDiagnostiqueByPatientId)
Route.delete("/delete", diagnostiqueController.deleteAll);
Route.get("/getPateintFile/:id", diagnostiqueController.getFile);

module.exports = Route;