const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/trashbuck',{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Successful connection....");
}).catch((err)=>{
    console.log(err);
})
