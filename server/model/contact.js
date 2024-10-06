const mongose= require('mongoose')

const contactSchema= new mongose.Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }

})

const Contact=mongose.model('contact',contactSchema);
module.exports = Contact;
