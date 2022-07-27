const specialiteModel = require("../models/SpecialiteModel");
const { getSpecialite } = require("./UserController");

module.exports = {
     createSpecialite : function (req,res){
         const name = req.body.specialiteName
         specialiteModel.find({name}, function(err,spec){
             if(err){
                return res.status(500).json({ msg: err.message, error: true })
             }
             if(spec.length){
                return res.status(400).json({ message: "Specialite already exist", error: true }) 
             }
             else{
                specialiteModel.create({
                    name: req.body.specialiteName
                }, function(err,resultat){
                    if (err) {
                        res.json({ message: 'error create specialite' + err, resultat: null, status: 500 })
                    }
                    else {
                        res.json({ message: 'specialite created ', data: resultat, status: 200 })
        
                    }
                })
             }
         })
     
     },
     getSpecialite : function (req,res){
       specialiteModel.find({}).select({ "_id": 1,"name": 1}).exec(function(err,result){
        if (err) {
            res.json({ message: 'error getting specialite' + err, result: null, status: 500 })
        }
        else {
            res.send(result)

        }
       })
     },
     updateSpecialite : function (req,res){
         specialiteModel.findByIdAndUpdate({_id: req.params.id}, {$set:{name:req.body.updateName}},
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, success)=>{
                if (err) {
                    res.status(500).json({ message: "specialite not uploaded" });
                }
                else { res.status(200).json({ message: "Specialite name updeted" });}
            }
            
        )
     },
    deleteSpecialite: function (req, res) {

        specialiteModel.findByIdAndDelete({ _id: req.params.id }, (err, User) => {

            if (err) { res.json({ message: 'error delete  one Specialite' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one Specialite delete system', data: User, status: 200 }) }

        })

    },
}