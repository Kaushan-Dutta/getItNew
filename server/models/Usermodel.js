const mongoose=require('mongoose');

require('../connectserver');

const itemSchema=new mongoose.Schema({
    image:{type:String, required:true},
    status:{type:String,default:'Pending',enum:['Pending','Accepted','Restored']},
    owner:{type:mongoose.Schema.Types.ObjectId,required:true},
    restoredby:{type:mongoose.Schema.Types.ObjectId}    
})
const userSchema=new mongoose.Schema({
   username:{type:String,required:true},
   address:{type:String,required:true},
})
const userModel=new mongoose.model('UserModel',userSchema);
const itemModel=new mongoose.model('ItemModel',itemSchema);

module.exports={userModel,itemModel};