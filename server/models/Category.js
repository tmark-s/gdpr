const mongoose = require('mongoose');

const Category = mongoose.model('category', {
  nameTh: {
    type: String,
    require: true,
  },
  nameEng: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category;