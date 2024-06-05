const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project')
.then(()=>{
    console.log("mongodb connected successfully done..");
}).catch((error)=>{
    console.log(`mongodb connection error problem ${error}`);
});
const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
const collection = new mongoose.model("loginWithNode",LogInSchema);
module.exports = collection;
