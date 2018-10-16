const mongoose = require('mongoose');

const Domain = mongoose.model('domain', {
  name: {
    type: String
  },
  emailSubscribe: {
    canSubscribe: {
      type: Boolean
    },
    category: [
      {
        name: {
          type: String,
          unique: true
        },
        value: {
          type: String,
          unique: true
        },
        canSubscribe: {
          type: Boolean
        }
      }
    ]
  },
  smsSubscribe: {
    canSubscribe: {
      type: Boolean
    },
    category: [
      {
        name: {
          type: String,
          unique: true
        },
        value: {
          type: String,
          unique: true
        },
        canSubscribe: {
          type: Boolean
        }
      }
    ] 
  },
  phoneSubscribe: {
    canSubscribe: {
      type: Boolean
    }
  }
});

module.exports = Domain;