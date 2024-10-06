const mongoose = require('mongoose') 

const authorSchema= new mongoose.Schema({
    author:{
        type:String,
        required:true,
        unique:true
    },
    creation_date: {
        type: Date,
        default: Date.now,
      },
      updation_date: {
        type: Date,
        default: Date.now, // Optional: update on modification
      }
})

const Author = mongoose.model('author',authorSchema)
module.exports = Author;