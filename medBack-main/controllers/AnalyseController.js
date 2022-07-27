const analyseModel = require('../models/AnalyseModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
var mongoose = require('mongoose');

require('../passportConfig');
//const Validateanalyse = require('../validation/analyseValid')
module.exports = {

    createanalyse: function (req, res) {
        console.log(req.body)
        analyseModel.create({
                userId: req.body.userId,
                doctorId: req.body.doctorId,
                name : req.body.name
             //   payed: req.body.payed,
               // file: req.file.path
 
            },
                function (err, analyse) {
                    if (err) {
                        res.json({ message: 'error create analyse' + err, data: null, status: 500 })
                    }
                    else {
                        res.json({ message: 'analyse created ', data: analyse, status: 200 })
        
                    }
                })

        
            },
    // UPDATE ANALYSE BY ADDING LABID
    updateAnalyseByLabID : function(req,res) {
        console.log(req.body, req.params)
        analyseModel.findOneAndUpdate({_id:req.params.id} ,
            { $set: {
                labId: mongoose.Types.ObjectId(req.body.args) ,
                patientSend:true
            }},
             { new: true },(err,lab)=>{
                if (err) {
                    res.status(500).json({
                        message: "Analyse  not updated ",
                      
                    });
                }
                else {
                    res.status(200).json({
                        message: "Analyse send with success",
                        data:lab
                    });
                }
             })
    },
    // GET ANALYSE BY LABO ID 
    getAnalyseByLabID : function(req,res) {
        analyseModel.find({labId:req.params.id} ,
          (err,lab)=>{
                if (err) {
                    res.status(500).json({
                        message: "Analyse  not found ",
                      
                    });
                }
                else {
                    res.status(200).json(lab);
                }
             })
    },
    getAllanalyses: function (req, res) {
        analyseModel.find({}).exec((err, analyses) => {
            if (err) {
                res.json({ message: 'error get all analyses' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all analyses in system', size: analyses.length, data: analyses, status: 200 })

            }
        })
    },
    getanalyseById: function (req, res) {
        analyseModel.findById({ _id: req.params.id })
            .exec((err, analyse) => {
                if (err) {
                    res.json({ message: 'error get one analyse' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' analyse in system', data: analyse, status: 200 })


                }
            })
    },
    getAnalyseByDoctorId : function (req,res) {
        console.log(req.body)
        analyseModel.find({doctorId:req.body.doctorId, userId:req.body.userId})
        .exec((err, analyse) => {

            if (err) {
                res.json({ message: 'error on getting analyse' + err,status: 500 })
            }
            else {
                res.json({  data: analyse, status: 200 })
            }
        })
    },
    // GET ANALYSE BY USER ID
    getAnalyseByPatientId : function (req,res) {
        console.log(req.body)
        analyseModel.find({ userId:req.params.id})
        .exec((err, analyse) => {

            if (err) {
                res.json({ message: 'error on getting analyse' + err,status: 500 })
            }
            else {
                res.json({  data: analyse, status: 200 })
            }
        })
    },
    deleteanalyseById: function (req, res) {
        analyseModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, analyse) => {

                if (err) {
                    res.json({ message: 'error delete  one analyse' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one analyse delete system', data: analyse, status: 200 })
                }
            })
    },
    // SET SEND PATIENT TRUE
    updateSendPatient : (req,res) =>{
        analyseModel.findByIdAndUpdate({ _id: req.params.id }, {$set:{patientSend:true}}, { new: true },
        (err, ana)=>{
            if(err){
                console.log(err)
            }else {
                console.log("updated", ana)
            }
        }
        )
    },
    updateanalyseById: (req, res) => {
        if(req.file ==undefined){
            analyseModel.findOneAndUpdate({ _id: req.params.id },
                { $set: {
                    payed: req.body.payed,
                  
                    labSend: true
                  }},
               { new: true }, (err, analyse) => {
                if (err) {
                    res.status(500).json({
                        message: "analyse not updated ",
                        data: null,
                    });
                } else {
                    res.status(200).json({
                        message: "analyse updated successfuly ",
                       
                    });
                }
            });   
        }
        else {
            analyseModel.findOneAndUpdate({ _id: req.params.id },
                { $set: {
                    payed: req.body.payed,
                    file : req.file.path,
                    labSend: true
                  }},
               { new: true }, (err, analyse) => {
                if (err) {
                    res.status(500).json({
                        message: "analyse not updated ",
                        data: null,
                    });
                } else {
                    res.status(200).json({
                        message: "analyse updated successfuly ",
                       
                    });
                }
            });
        }
       
    },
    getAnalyseFile : function (req,res) {
        analyseModel.findById({_id:req.params.id},'file',(err, analyse)=>{
            if (err) {
                res.status(500).json({ message: "No resultat yet" });
            }
            else {
                if(analyse.file=== undefined){ 
                    console.log(analyse.file)
                    res.json({
                        message: "No REsultat ",
                       
                    })
                }
                else{
                     res.download(analyse.file)
                }
              
               //
               
            }
         })
    },
    // DELETE MANAY
    deletALL : function (req, res){
        analyseModel.deleteMany({}).then((data)=>res.send(data)).catch((err)=>console.log(err))
    }
}