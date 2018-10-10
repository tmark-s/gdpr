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
          type: String
        },
        value: {
          type: String
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
          type: String
        },
        value: {
          type: String
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