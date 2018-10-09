const mongoose = require('mongoose');

const User = mongoose.model('user', {
  info: {
    email: {
      type: String,
    },
    phone: {
      type: String
    },
    link: {
      type: String
    }
  },
  domain: [
    {
      domainName: {
        type: String,
        require: true
      },
      snooze: {
        isSnooze: {
          type: Boolean
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        }
      },
      channel: {
        emailSubscribeCategory: {
          type: [String]
        },
        smsSubscribeCategory: {
          type: [String]
        },
        phoneSubscribe: {
          type: Boolean
        }
      }
    }
  ]
});

module.exports = User;