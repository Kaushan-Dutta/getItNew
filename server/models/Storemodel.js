const mongoose=require('mongoose');

require('../connectserver');

const requestSchema=new mongoose.Schema({
    item:{type:mongoose.Schema.Types.ObjectId,required:true},
    store:{type:mongoose.Schema.Types.ObjectId,required:true},
    newImage:{type:String,required:true},
    recyclePrice:{type:Number,required:true},
    deliveredBy:{type:String,required:true},
    status:{type:String,enum:['Accepted','Rejected','Pending'],default:'Pending'}
})
const storeSchema=new mongoose.Schema({
    storename:{type:String, required:true},
    address:{type:String, required:true},
})

const storeModel=new mongoose.model('StoreModel',storeSchema);
const requestModel=new mongoose.model('RequestModel',requestSchema);

module.exports={requestModel,storeModel};
