const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: String,
    ref: 'Book',
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  issued_date: {
    type: Date,
    default: Date.now,
  },
  return_date: {
    type: Date,
    default: function() {
      const twoWeeksLater = new Date(this.issued_date);
      twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
      return twoWeeksLater;
    },
  },
  status: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 0,
  },
});

// Pre-save middleware to ensure return_date is always set
issuedBookSchema.pre('save', function(next) {
  if (!this.return_date) {
    const twoWeeksLater = new Date(this.issued_date);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    this.return_date = twoWeeksLater;
  }
  next();
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema);