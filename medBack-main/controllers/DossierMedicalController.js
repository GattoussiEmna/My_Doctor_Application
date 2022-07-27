const dossierMedicalModel = require('../models/DossierMedicalModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../passportConfig');
//const ValidatedossierMedical = require('../validation/dossierMedicalValid')
module.exports = {

    createdossierMedical: function (req, res) {
console.log("medical record",req.body, req )
        dossierMedicalModel.create(req.body, (err, dossierMedical) => {
            if (err) {
                res.json({ message: 'error create dossierMedical' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'dossierMedical created ', data: dossierMedical, status: 200 })

            }
        })
    },
    getAlldossierMedicals: function (req, res) {
        dossierMedicalModel.find({}).populate('user').populate('doctor').populate('diagnostique').exec((err, dossierMedicals) => {
            if (err) {
                res.json({ message: 'error get all dossierMedicals' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all dossierMedicals in system', size: dossierMedicals.length, data: dossierMedicals, status: 200 })

            }
        })
    },
    getdossierMedicalById: function (req, res) {
        dossierMedicalModel.find({ _id: req.params.id }).populate('user').populate('doctor').populate('diagnostique')
            .exec((err, dossierMedical) => {
                if (err) {
                    res.json({ message: 'error get one dossierMedical' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' dossierMedical in system', data: dossierMedical, status: 200 })


                }
            })
    },
    deletedossierMedicalById: function (req, res) {
        dossierMedicalModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, dossierMedical) => {

                if (err) {
                    res.json({ message: 'error delete  one dossierMedical' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one dossierMedical delete system', data: dossierMedical, status: 200 })
                }
            })
    },
    updatedossierMedicalById: (req, res) => {
        dossierMedicalModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, dossierMedical) => {
            if (err) {
                res.status(500).json({
                    message: "error geting medical record for user",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "dossierMedical updated successfuly ",
                    data: req.body,
                });
            }
        });
    },
    // GET MEDICAL RECORD FOR PATIENT
    getMedicalPatient: function (req,res){
        console.log('test')
         dossierMedicalModel.find({user: req.params.id})
         .populate('diagnostique').populate("analyse").populate("ordonance").populate('user')
         .exec((err, resultat)=>{
             if(err){
                res.status(500).json({
                    message: "we couldn't find your medical record",
                    data: null,
                });
             }else{
                 console.log(resultat)
                res.status(200).json({
                   
                    data:resultat
                });
             }
         })
    },
    updateAnalyseId : function (req,res){
        console.log(req.params, req.body)
      dossierMedicalModel.findByIdAndUpdate({_id: req.params.id},
        {ordonance: req.body.ordonance},{new: true},
        function(err, data){
            {
                // Handle any possible database errors
                if (err) {
                  console.log("we hit an error" + err);
                 
                }
                console.log("This is the Response: " + data);
              }
        })
    },
    // DELETE ALL
    deleteDiagnostic : function (req,res){
        dossierMedicalModel.deleteMany({}).exec((err, resultat)=>{
            if (err) {
                console.log(err)
            }
            else {
                console.log(resultat)
             }
        })
    }
}