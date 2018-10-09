const mongoose = require('mongoose');

const Domain = mongoose.model('domain', {
  domainName: {
    type: String
  },
  channel: {
    emailSubscribe: {
      canSubscribe: {
        type: Boolean
      },
      categoryName: {
        type: [String]
      }
    },
    smsSubscribe: {
      canSubscribe: {
        type: Boolean
      },
      categoryName: {
        type: [String]
      }
    },
    phoneSubscribe: {
      canSubscribe: {
        type: Boolean
      }
    }
  }
});

module.exports = Domain;