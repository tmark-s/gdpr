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
      channel: {
        emailSubscribe: {
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
          emailSubscribeCategory: {
            type: [String]
          }
        },
        smsSubscribe: {
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
          smsSubscribeCategory: {
            type: [String]
          }
        },
        phoneSubscribe: {
          type: Boolean
        }
      }
    }
  ]
});

module.exports = User;