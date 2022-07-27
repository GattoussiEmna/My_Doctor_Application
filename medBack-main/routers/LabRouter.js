const Route = require('express').Router();
const LabController = require('../controllers/LabController');
const labController = require("../controllers/LabController");

Route.post("/addLab", labController.createLab);
Route.get("/getLabList", labController.getLab);
Route.put("/addAnalyseId/:id", labController.AddAnalyseId);
Route.get("/getAnalyse/:id", labController.GetLAboAnalyse);
Route.delete("/deleteAll", LabController.deleteALL);
Route.get('/getLabBYLABID/:id', labController.getLabBYLabUSERID)
module.exports = Route;