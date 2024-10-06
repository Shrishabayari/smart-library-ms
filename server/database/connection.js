const mongoose = require('mongoose');

function RunServer() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('mongodb connected');
  } catch {
    console.log(error.message);
  }
}
module.exports = RunServer;
