const labModel = require("../models/LabModel");
const AnalyseModel = require("../models/AnalyseModel");
const userModel = require ("../models/UserModel");

module.exports ={
  
    createLab : function (req,res){
        labModel.create({
            name: req.body.name,
            address: req.body.address,
            labId: req.body.labId
        },
        function (err, lab) {
            if (err) {
                res.json({ message: 'error create Lab' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'Lab created ', data: lab, status: 200 })

            }
        }         
        )
    },
    getLab : function(req,res){
        labModel.find({}).populate("labId").exec((err,lab)=>{
            if(err){
                res.json({ message: 'error on getting lab list' + err,status: 500 })

            }
            else{
                res.send(lab)
            }
        })
    },
    // GET ANALYSE BY LABO ID
    GetLAboAnalyse : function(req,res){

        console.log(req.params.id);
        labModel.find({labId:req.params.id})
        .populate({
            path: 'AnalyseId',
            model: AnalyseModel,
           
            populate: {
               path: 'userId',
               model: userModel 
               
            },
            populate: {
                path: 'doctorId',
                model: userModel 
                
             }
         })
         .populate({
            path: 'AnalyseId',
            model: AnalyseModel,
           
            populate: {
               path: 'userId',
               model: userModel 
               
            },
           
         })
        .exec((err,data)=>{

            if(err){
                res.json({ message: 'error on getting lab' + err,status: 500 })
            }
            else{
               res.send(data) 
            }
          
        })
    },
    // UPDATE LAB BY ADDING ANALYSE ID
    AddAnalyseId : function (req,res){
        console.log(req.body, req.params.id)
        labModel.findByIdAndUpdate({_id: req.params.id}, 
                                    { $set: {
                                        labId: req.body.labId,
                                        patientSend:true
                                    }},
                                     { new: true },(err,lab)=>{
                                        if (err) {
                                            res.status(500).json({
                                                message: "lab not updated ",
                                              
                                            });
                                        }
                                        else {
                                            res.status(200).json({
                                                message: "Analyse send with success",
                                               
                                            });
                                        }
                                     }
       )
    },
    getLabBYLabUSERID : function (req,res){
        labModel.find({labId:req.params.id}).then((data)=>{
         // res.send(data);
          console.log(data[0]._id);
          const id= data[0]._id;
          AnalyseModel.find({labId:id}).populate('userId').populate('doctorId').then((resultat)=>res.send(resultat))
        }).catch((err)=>console.log(err))
    },
    deleteALL : function (req,res){
         labModel.deleteMany({}).then((data)=>res.send(data)).catch((err)=>console.log(err))
    }
  
}