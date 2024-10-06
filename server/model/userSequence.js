const mongoose = require('mongoose');

// Access the existing Mongoose connection from user.js
const db = mongoose.connection.db;

db.createCollection("user_sequence", {
  capped: true,
  size: 1024,
  max: 100000
})
.then(() => console.log('user_sequence collection created'))
.catch(err => console.error('Error creating collection:', err));

db.user_sequence.insert({ _id: "user_id", sequence_value: 0 })
.then(() => console.log('user_sequence document inserted'))
.catch(err => console.error('Error inserting document:', err));