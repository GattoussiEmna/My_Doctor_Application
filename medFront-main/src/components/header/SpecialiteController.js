const specialiteModel = require("../models/SpecialiteModel");
const { getSpecialite } = require("./UserController");

module.exports = {
     createSpecialite : function (req,res){
        specialiteModel.create({
            name: req.body.name
        }, function(err,resultat){
            if (err) {
                res.json({ message: 'error create specialite' + err, resultat: null, status: 500 })
            }
            else {
                res.json({ message: 'specialite created ', data: resultat, status: 200 })

            }
        })
     },
     getSpecialite : function (req,res){
       specialiteModel.find({}).select({ "_id": 1,"name": 1}).exec(function(err,result){
        if (err) {
            res.json({ message: 'error getting specialite' + err, result: null, status: 500 })
        }
        else {
            res.json({ data: result, status: 200 })

        }
       })
     },
     
    deleteSpecialite: function (req, res) {

        specialiteModel.findByIdAndDelete({ _id: req.params.id }, (err, User) => {

            if (err) { res.json({ message: 'error delete  one Specialite' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one Specialite delete system', data: User, status: 200 }) }

        })

    },
}