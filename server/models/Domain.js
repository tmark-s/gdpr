const mongoose = require('mongoose');

const Domain = mongoose.model('domain', {
  domainName: {
    type: String
  },
  channel: {
    emailSubscribe: {
      type: Boolean
    },
    smsSubscribe: {
      type: Boolean
    },
    phoneSubscribe: {
      type: Boolean
    }
  },
  category: [
    {
      categoryName: {
        type: String
      }
    }
  ]
});

module.exports = Domain;