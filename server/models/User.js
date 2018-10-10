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
              type: String
            },
            endDate: {
              type: String
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
              type: String
            },
            endDate: {
              type: String
            }
          },
          smsSubscribeCategory: {
            type: [String]
          }
        },
        phoneSubscribe: {
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
          },
          isSubscribe: {
            type: Boolean
          }
        }
      }
    }
  ]
});

module.exports = User;