const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const dossierMedicalController = require('../controllers/DossierMedicalController')


Route.post("/AdddossierMedical",  dossierMedicalController.createdossierMedical)
Route.get("/ALLdossierMedical", dossierMedicalController.getAlldossierMedicals)
Route.get("/getdossierMedicalByID/:id", dossierMedicalController.getdossierMedicalById)
Route.put("/updateAn/:id", dossierMedicalController.updateAnalyseId);
Route.delete("/deletedossierMedical/:id", passport.authenticate('jwt', { session: false }), dossierMedicalController.deletedossierMedicalById)
Route.put("/updatedossierMedical/:id", passport.authenticate('jwt', { session: false }), dossierMedicalController.updatedossierMedicalById)
Route.get("/getPateintMedicalRecord/:id", dossierMedicalController.getMedicalPatient);

Route.delete("/delelMed", dossierMedicalController.deleteDiagnostic)
module.exports = Route;