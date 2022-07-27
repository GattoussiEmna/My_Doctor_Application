const diagnostiqueModel = require('../models/DiagnostiqueModel');
const dossierMedicalModel = require('../models/DossierMedicalModel')
var mongoose = require('mongoose') 
 
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
//const Validatediagnostique = require('../validation/diagnostiqueValid')

module.exports = {
    creatediagnostique: function (req, res) {
        console.log(req.body, req.file)
        const mediRe = req.body.medicalRecordId;
            diagnostiqueModel.create({
            userId: req.body.userId,
            doctorId: req.body.doctorId,
            description: req.body.description,
            file: req.file.path,
          
        },
            function (err, diagnostique) {
                if (err) {
                    res.json({ message: 'error create diagnostique' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'diagnostique created ', data: diagnostique, status: 200 })

                  
                    
                

                }
            })


    },
    getAlldiagnostiques: function (req, res) {
        diagnostiqueModel.find({}).populate('userId').exec((err, diagnostiques) => {
            if (err) {
                res.json({ message: 'error get all diagnostiques' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all diagnostiques in system', size: diagnostiques.length, data: diagnostiques, status: 200 })

            }
        })
    },
    // By Doc ID
    getDiagnostiqueByUserId : function (req,res){
        diagnostiqueModel.find({doctorId : req.params.id})
        .exec((err, diagnostique) => {
            if (err) {
                res.json({ message: 'error get one diagnostique' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: ' diagnostique in system', data: diagnostique, status: 200 })


            }
        })
    },
    // BY USSER
    getDiagnostiqueByPatientId : function (req,res){
        diagnostiqueModel.find({userId : req.params.id}).populate('doctorId')
        .exec((err, diagnostique) => {
            if (err) {
                res.json({ message: 'error get one diagnostique' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: ' diagnostique in system', data: diagnostique, status: 200 })


            }
        })
    },
    getdiagnostiqueById: function (req, res) {
        diagnostiqueModel.findById({ _id: req.params.id })
            .exec((err, diagnostique) => {
                if (err) {
                    res.json({ message: 'error get one diagnostique' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' diagnostique in system', data: diagnostique, status: 200 })


                }
            })
    },
    deletediagnostiqueById: function (req, res) {
        diagnostiqueModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, diagnostique) => {

                if (err) {
                    res.json({ message: 'error delete  one diagnostique' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one diagnostique delete system', data: diagnostique, status: 200 })
                }
            })
    },
    updatediagnostiqueById: (req, res) => {
        if(req.file ==undefined){
            diagnostiqueModel.findOneAndUpdate({ _id: req.params.id },
                { $set: {
                    description: req.body.description,
                    
                   
                  }}, { new: true }, (err, diagnostique) => {
                    if (err) {
                        res.status(500).json({
                            message: "diagnostique not updated ",
                            data: null,
                        });
                    } else {
                        res.status(200).json({
                            message: "diagnostique updated successfuly ",
                            data: req.body,
                        });
                    }
                });
        }
        else{
            diagnostiqueModel.findOneAndUpdate({ _id: req.params.id },
                { $set: {
                    description: req.body.description,
                    file : req.file.path
                   
                  }}, { new: true }, (err, diagnostique) => {
                    if (err) {
                        res.status(500).json({
                            message: "diagnostique not updated ",
                            data: null,
                        });
                    } else {
                        res.status(200).json({
                            message: "diagnostique updated successfuly ",
                            data: req.body,
                        });
                    }
                });
        }
      
    },
    deleteAll :(req,res)=>{
        diagnostiqueModel.deleteMany({}).exec((err, resultat)=>{
            if (err) {
                console.log(err)
            }
            else {
                console.log(resultat)
             }
        })
    },
      // Get Diagnostic file 
      getFile : (req,res)=>{
        console.log(req.params.id)
        diagnostiqueModel.findById({_id:req.params.id},'file',(err, user)=>{
           if (err) {
               res.status(500).json({ message: "file not uploaded" });
           }
           else {
               console.log(user)
             
               res.download(user.file)
              
           }
        })
      },
}