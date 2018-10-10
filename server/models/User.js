const mongoose = require('mongoose');

const User = mongoose.model('user', {
  info: {
    email: {
      type: String,
    },
    phone: {
      type: String
    },
    user: {
      type: String
    }
  },
  domain: [
    {
      name: {
        type: String,
        require: true
      },
      emailSubscribe: {
        type: [String]
      },
      smsSubscribe: {
        type: [String]
      },
      phoneSubscribe: {
        type: Boolean
      },
      snooze: {
        isSnooze: {
          type: Boolean
        },
        startDate: {
          type: String
        },
        endDate: {
          type: String
        }
      } 
    }
  ]
});

module.exports = User;