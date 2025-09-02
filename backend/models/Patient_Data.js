const mongoose=require('mongoose')
const patientSchema=new mongoose.Schema(    
    {
    Name:{type:String},
    Age:{type:Number},
    Height:{type:Number},
    Weight:{type:Number},
    Email:{type:String},
    
    lmean:{type:Number},
    rmean:{type:Number},
    avg:{type:Number},
    maxValues:{type:[Number]}
    }
)
module.exports=new mongoose.model('PSchema',patientSchema)
