const Route = require('express').Router();
const specialiteController = require("../controllers/SpecialiteController");

Route.post('/createSpecialite', specialiteController.createSpecialite)
Route.get('/getSpecialite', specialiteController.getSpecialite);
Route.put('/updateSpec/id', specialiteController.updateSpecialite);
Route.delete('/delete/:id', specialiteController.deleteSpecialite);
module.exports = Route;