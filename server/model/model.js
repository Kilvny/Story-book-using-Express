const mongoose = require('mongoose')

// define the shape of your document - or the schema init

let schema = new mongoose.Schema({
    name:{
        'type':String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String,
    
})

// create the model with first args as the name of the model and the second args as the shape of the model
const UserDB = mongoose.model('userdb',schema)

module.exports = UserDB