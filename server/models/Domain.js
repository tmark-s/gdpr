const mongoose = require('mongoose');

const Domain = mongoose.model('domain', {
  name: {
    type: String
  },
  hash: {
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
          type: String
        },
        value: {
          type: String
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